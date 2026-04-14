export type RunnerLanguage =
  | "python"
  | "javascript"
  | "java"
  | "c"
  | "cpp"
  | "js";

export type ExecuteRequest = {
  language: RunnerLanguage;
  code: string;
  stdin?: string;
  timeout_seconds?: number;
  wait_timeout?: number;
};

export type ExecutionResult = {
  stdout: string;
  stderr: string;
  exit_code: number;
  timed_out: boolean;
  duration_ms: number;
};

export type TaskStatus = "queued" | "completed" | "failed";

export type TaskResultResponse = {
  task_id: string;
  status: TaskStatus;
  result?: ExecutionResult | null;
  error?: string | null;
};

export class RunnerApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "RunnerApiError";
    this.status = status;
    this.details = details;
  }
}

const DEFAULT_RUNNER_BASE_URL = "http://localhost:8000";

function getRunnerBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_RUNNER_API_URL?.replace(/\/$/, "") ??
    DEFAULT_RUNNER_BASE_URL
  );
}

async function parseErrorBody(response: Response) {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getRunnerBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await parseErrorBody(response);
    const message =
      typeof details === "object" && details && "detail" in details
        ? String((details as { detail?: unknown }).detail)
        : `Runner request failed with status ${response.status}`;

    throw new RunnerApiError(message, response.status, details);
  }

  return (await response.json()) as T;
}

export function executeCode(request: ExecuteRequest) {
  return requestJson<TaskResultResponse>("/execute", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function getTaskResult(taskId: string) {
  return requestJson<TaskResultResponse>(`/result/${taskId}`, {
    method: "GET",
  });
}

function sleep(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function waitForTaskCompletion(
  taskId: string,
  options?: {
    maxAttempts?: number;
    intervalMs?: number;
  },
) {
  const maxAttempts = options?.maxAttempts ?? 16;
  const intervalMs = options?.intervalMs ?? 1200;

  let latestResponse: TaskResultResponse | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    latestResponse = await getTaskResult(taskId);

    if (
      latestResponse.status === "completed" ||
      latestResponse.status === "failed"
    ) {
      return latestResponse;
    }

    await sleep(intervalMs);
  }

  return latestResponse;
}

export async function executeAndResolve(
  request: ExecuteRequest,
  options?: {
    maxAttempts?: number;
    intervalMs?: number;
  },
) {
  const response = await executeCode(request);

  if (response.status === "completed" || response.status === "failed") {
    return response;
  }

  return waitForTaskCompletion(response.task_id, options);
}
