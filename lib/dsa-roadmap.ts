export const ROADMAP_LEVELS = [
  {
    slug: "foundation",
    shortLabel: "L1",
    label: "Foundation",
    description: "Build baseline pattern recognition and syntax confidence.",
  },
  {
    slug: "intermediate",
    shortLabel: "L2",
    label: "Intermediate",
    description: "Combine patterns and optimize complexity under constraints.",
  },
  {
    slug: "advanced",
    shortLabel: "L3",
    label: "Advanced",
    description: "Handle hard edge cases and multi-pattern interview setups.",
  },
] as const;

export type RoadmapLevel = (typeof ROADMAP_LEVELS)[number];
export type RoadmapLevelSlug = RoadmapLevel["slug"];

export type SupportedLanguageId =
  | "python"
  | "javascript"
  | "java"
  | "cpp"
  | "c";

export type DsaTestCase = {
  id: number;
  title: string;
  input: string;
  expectedOutput: string;
};

export type DsaExample = {
  title: string;
  input: string;
  output: string;
  explanation: string;
};

export type ResourceLink = {
  title: string;
  url: string;
};

export type DsaTopic = {
  id: string;
  slug: string;
  order: number;
  name: string;
  description: string;
  resources: {
    videos: ResourceLink[];
    articles: ResourceLink[];
  };
};

export type DsaQuestion = {
  id: string;
  slug: string;
  topicSlug: string;
  levelSlug: RoadmapLevelSlug;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  averageMinutes: number;
  summary: string;
  statement: string[];
  constraints: string[];
  examples: DsaExample[];
  relatedTopics: string[];
  judgeTokens: string[];
  starterCode?: Partial<Record<SupportedLanguageId, string>>;
  testCases: DsaTestCase[];
};

type SampleCase = {
  input: string;
  output: string;
  explanation: string;
};

type QuestionSeed = {
  topicSlug: string;
  levelSlug: RoadmapLevelSlug;
  slug: string;
  title: string;
  difficulty: DsaQuestion["difficulty"];
  averageMinutes: number;
  summary: string;
  prompt: string;
  sampleCases: SampleCase[];
  relatedTopics: string[];
  constraints?: string[];
};

const LEVEL_GUIDANCE: Record<RoadmapLevelSlug, string> = {
  foundation:
    "Prefer a clear and correct solution first, then explain why it works.",
  intermediate: "Aim for optimal time complexity and document key edge cases.",
  advanced:
    "Optimize both correctness and complexity under harder constraints.",
};

const DEFAULT_CONSTRAINTS: Record<DsaQuestion["difficulty"], string[]> = {
  Easy: [
    "1 <= n <= 10^4",
    "Focus on correctness for base and edge cases.",
    "Expected complexity: O(n) or O(n log n).",
  ],
  Medium: [
    "1 <= n <= 10^5",
    "Avoid brute-force where a pattern-based method exists.",
    "Expected complexity: O(n), O(n log n), or equivalent optimized approach.",
  ],
  Hard: [
    "Input sizes can be large and adversarial.",
    "Use advanced data structures or multi-step optimizations.",
    "Expected complexity should improve substantially over naive search.",
  ],
};

export const ROADMAP_TOPICS: DsaTopic[] = [
  {
    id: "topic_arrays_hashing",
    slug: "arrays-hashing",
    order: 1,
    name: "Arrays & Hashing",
    description:
      "Core indexing tricks, frequency maps, and direct-access pattern recognition.",
    resources: {
      videos: [
        {
          title: "Arrays and Hashing Walkthrough",
          url: "https://www.youtube.com/watch?v=ZaAKEZZRPgM",
        },
      ],
      articles: [
        {
          title: "Array Data Structure Guide",
          url: "https://www.geeksforgeeks.org/array-data-structure-guide/",
        },
      ],
    },
  },
  {
    id: "topic_two_pointers",
    slug: "two-pointers",
    order: 2,
    name: "Two Pointers",
    description:
      "Bidirectional scans and converging-window techniques on sorted or constrained data.",
    resources: {
      videos: [
        {
          title: "Two Pointers Technique Tutorial",
          url: "https://www.youtube.com/watch?v=9kdHxplyl5I",
        },
      ],
      articles: [
        {
          title: "Two Pointers Technique",
          url: "https://www.geeksforgeeks.org/two-pointers-technique/",
        },
      ],
    },
  },
  {
    id: "topic_sliding_window",
    slug: "sliding-window",
    order: 3,
    name: "Sliding Window",
    description:
      "Dynamic ranges with efficient updates for substring and subarray optimization.",
    resources: {
      videos: [
        {
          title: "Sliding Window Pattern Tutorial",
          url: "https://www.youtube.com/watch?v=9kdHxplyl5I",
        },
      ],
      articles: [
        {
          title: "Window Sliding Technique",
          url: "https://www.geeksforgeeks.org/window-sliding-technique/",
        },
      ],
    },
  },
  {
    id: "topic_stack_queues",
    slug: "stack-queues",
    order: 4,
    name: "Stack & Queues",
    description:
      "LIFO/FIFO workflows, monotonic structures, and deferred evaluation problems.",
    resources: {
      videos: [
        {
          title: "Stack and Queue Concepts",
          url: "https://www.youtube.com/watch?v=4_xdaIsY2nk",
        },
      ],
      articles: [
        {
          title: "Stack Data Structure",
          url: "https://www.geeksforgeeks.org/stack-data-structure/",
        },
      ],
    },
  },
  {
    id: "topic_binary_search",
    slug: "binary-search",
    order: 5,
    name: "Binary Search",
    description:
      "Search-space reduction over sorted arrays, monotonic predicates, and answer space.",
    resources: {
      videos: [
        {
          title: "Binary Search Masterclass",
          url: "https://www.youtube.com/watch?v=_NT69eLpqks",
        },
      ],
      articles: [
        {
          title: "Binary Search",
          url: "https://www.geeksforgeeks.org/binary-search/",
        },
      ],
    },
  },
  {
    id: "topic_linked_list",
    slug: "linked-list",
    order: 6,
    name: "Linked List",
    description:
      "Pointer manipulation, in-place rewiring, and segmented list composition.",
    resources: {
      videos: [
        {
          title: "Linked List Fundamentals",
          url: "https://www.youtube.com/watch?v=NSh5oNElD84",
        },
      ],
      articles: [
        {
          title: "Linked List Data Structure",
          url: "https://www.geeksforgeeks.org/data-structures/linked-list/",
        },
      ],
    },
  },
  {
    id: "topic_trees",
    slug: "trees",
    order: 7,
    name: "Trees",
    description:
      "Recursive traversal, subtree DP, and hierarchy-based state propagation.",
    resources: {
      videos: [
        {
          title: "Binary Trees and Traversals",
          url: "https://www.youtube.com/watch?v=eKJrXBCRuNQ",
        },
      ],
      articles: [
        {
          title: "Binary Tree Data Structure",
          url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
        },
      ],
    },
  },
  {
    id: "topic_tries",
    slug: "tries",
    order: 8,
    name: "Tries",
    description:
      "Prefix-oriented indexing for fast string lookups and dictionary operations.",
    resources: {
      videos: [
        {
          title: "Trie Data Structure Explained",
          url: "https://www.youtube.com/watch?v=8H0Cj3GNniA",
        },
      ],
      articles: [
        {
          title: "Trie Insert and Search",
          url: "https://www.geeksforgeeks.org/trie-insert-and-search/",
        },
      ],
    },
  },
  {
    id: "topic_heap_priority_queue",
    slug: "heap-priority-queue",
    order: 9,
    name: "Heap & Priority Queue",
    description:
      "Top-k extraction, streaming medians, and prioritized processing pipelines.",
    resources: {
      videos: [
        {
          title: "Heaps and Priority Queue",
          url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
        },
      ],
      articles: [
        {
          title: "Heap Data Structure",
          url: "https://www.geeksforgeeks.org/heap-data-structure/",
        },
      ],
    },
  },
  {
    id: "topic_backtracking",
    slug: "backtracking",
    order: 10,
    name: "Backtracking",
    description:
      "Search trees, pruning rules, and combinatorial generation techniques.",
    resources: {
      videos: [
        {
          title: "Backtracking Problem Solving",
          url: "https://www.youtube.com/watch?v=p9m2LHBW81M",
        },
      ],
      articles: [
        {
          title: "Backtracking Algorithms",
          url: "https://www.geeksforgeeks.org/backtracking-algorithms/",
        },
      ],
    },
  },
  {
    id: "topic_graphs",
    slug: "graphs",
    order: 11,
    name: "Graphs",
    description:
      "Traversal, shortest paths, components, and dependency scheduling.",
    resources: {
      videos: [
        {
          title: "Graph Algorithms Overview",
          url: "https://www.youtube.com/watch?v=59fUtYYz7ZU",
        },
      ],
      articles: [
        {
          title: "Graph Data Structure and Algorithms",
          url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        },
      ],
    },
  },
  {
    id: "topic_dynamic_programming",
    slug: "dynamic-programming",
    order: 12,
    name: "Dynamic Programming",
    description:
      "State transitions, recurrence modeling, and memory optimization.",
    resources: {
      videos: [
        {
          title: "Dynamic Programming Patterns",
          url: "https://www.youtube.com/watch?v=yHARPtgbAqM",
        },
      ],
      articles: [
        {
          title: "Introduction to Dynamic Programming",
          url: "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html",
        },
      ],
    },
  },
  {
    id: "topic_greedy",
    slug: "greedy",
    order: 13,
    name: "Greedy",
    description: "Local-choice strategies with provable global correctness.",
    resources: {
      videos: [
        {
          title: "Greedy Algorithms Intuition",
          url: "https://www.youtube.com/watch?v=v0eQ4nXJjsk",
        },
      ],
      articles: [
        {
          title: "Greedy Algorithms",
          url: "https://www.geeksforgeeks.org/greedy-algorithms/",
        },
      ],
    },
  },
  {
    id: "topic_intervals",
    slug: "intervals",
    order: 14,
    name: "Intervals",
    description: "Range merging, conflict resolution, and timeline packing.",
    resources: {
      videos: [
        {
          title: "Intervals Problem Patterns",
          url: "https://www.youtube.com/watch?v=rpzaI1EPYSI",
        },
      ],
      articles: [
        {
          title: "Merge Overlapping Intervals",
          url: "https://www.geeksforgeeks.org/merging-intervals/",
        },
      ],
    },
  },
  {
    id: "topic_bit_manipulation",
    slug: "bit-manipulation",
    order: 15,
    name: "Bit Manipulation",
    description:
      "Bitwise reasoning, masks, and compact numeric transformations.",
    resources: {
      videos: [
        {
          title: "Bit Manipulation Tricks",
          url: "https://www.youtube.com/watch?v=qQd-ViW7bfk",
        },
      ],
      articles: [
        {
          title: "Bitwise Operators and Applications",
          url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/",
        },
      ],
    },
  },
  {
    id: "topic_math_geometry",
    slug: "math-geometry",
    order: 16,
    name: "Math & Geometry",
    description:
      "Numeric logic, formula-driven solving, and geometric interpretation.",
    resources: {
      videos: [
        {
          title: "Math and Geometry for Coding Interviews",
          url: "https://www.youtube.com/watch?v=kZwy2GTckB8",
        },
      ],
      articles: [
        {
          title: "Basic Computational Geometry",
          url: "https://cp-algorithms.com/geometry/basic-geometry.html",
        },
      ],
    },
  },
];

const QUESTION_SEEDS: QuestionSeed[] = [
  {
    topicSlug: "arrays-hashing",
    levelSlug: "foundation",
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    averageMinutes: 10,
    summary: "Detect whether an array contains any repeated value.",
    prompt:
      "Given an integer array nums, return true if any value appears at least twice; otherwise return false.",
    sampleCases: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "The value 1 appears twice.",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
        explanation: "All values are distinct.",
      },
    ],
    relatedTopics: ["Array", "Hash Set"],
  },
  {
    topicSlug: "arrays-hashing",
    levelSlug: "intermediate",
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    averageMinutes: 18,
    summary: "Group strings that are permutations of each other.",
    prompt:
      "Given an array of strings, group the anagrams together and return grouped results in any order.",
    sampleCases: [
      {
        input: "strs = [eat,tea,tan,ate,nat,bat]",
        output: "[[bat],[nat,tan],[ate,eat,tea]]",
        explanation: "Words with the same sorted signature belong together.",
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "Single empty string forms one group.",
      },
    ],
    relatedTopics: ["Array", "String", "Hash Map", "Sorting"],
  },
  {
    topicSlug: "arrays-hashing",
    levelSlug: "advanced",
    slug: "first-missing-positive",
    title: "First Missing Positive",
    difficulty: "Hard",
    averageMinutes: 30,
    summary: "Find the smallest missing positive integer in linear time.",
    prompt:
      "Given an unsorted integer array nums, return the smallest missing positive integer using O(n) time and constant extra space.",
    sampleCases: [
      {
        input: "nums = [1,2,0]",
        output: "3",
        explanation: "1 and 2 are present, so 3 is the first missing positive.",
      },
      {
        input: "nums = [3,4,-1,1]",
        output: "2",
        explanation: "2 is the smallest missing positive.",
      },
    ],
    relatedTopics: ["Array", "In-place Hashing"],
  },

  {
    topicSlug: "two-pointers",
    levelSlug: "foundation",
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    averageMinutes: 11,
    summary: "Validate palindrome after filtering non-alphanumeric characters.",
    prompt:
      "Given a string, return true if it reads the same forward and backward after removing non-alphanumeric characters and ignoring cases.",
    sampleCases: [
      {
        input: "s = A man, a plan, a canal: Panama",
        output: "true",
        explanation: "Filtered lowercase string is a palindrome.",
      },
      {
        input: "s = race a car",
        output: "false",
        explanation: "Characters mismatch when scanning from both ends.",
      },
    ],
    relatedTopics: ["String", "Two Pointers"],
  },
  {
    topicSlug: "two-pointers",
    levelSlug: "intermediate",
    slug: "three-sum",
    title: "3Sum",
    difficulty: "Medium",
    averageMinutes: 22,
    summary: "Find unique triplets that sum to zero.",
    prompt:
      "Given an integer array nums, return all unique triplets [a,b,c] where a + b + c = 0.",
    sampleCases: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation:
          "After sorting, two-pointer scans discover unique triplets.",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "No triplet sums to zero.",
      },
    ],
    relatedTopics: ["Array", "Sorting", "Two Pointers"],
  },
  {
    topicSlug: "two-pointers",
    levelSlug: "advanced",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    averageMinutes: 28,
    summary: "Compute total trapped water from elevation bars.",
    prompt:
      "Given an elevation map represented by non-negative integers, compute how much water can be trapped after rainfall.",
    sampleCases: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "Water accumulates between taller boundaries.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "Multiple valleys contribute to total trapped water.",
      },
    ],
    relatedTopics: ["Array", "Two Pointers", "Dynamic Programming"],
  },

  {
    topicSlug: "sliding-window",
    levelSlug: "foundation",
    slug: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    averageMinutes: 12,
    summary: "Maximize profit from one buy and one sell.",
    prompt:
      "Given daily stock prices, return the maximum possible profit from a single buy and later sell.",
    sampleCases: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy at 1 and sell at 6.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "No profitable transaction exists.",
      },
    ],
    relatedTopics: ["Array", "Sliding Window", "Greedy"],
  },
  {
    topicSlug: "sliding-window",
    levelSlug: "intermediate",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    averageMinutes: 18,
    summary: "Find the longest substring containing unique characters.",
    prompt:
      "Given a string s, return the length of the longest substring without repeating characters.",
    sampleCases: [
      {
        input: "s = abcabcbb",
        output: "3",
        explanation: "abc is the longest unique substring.",
      },
      {
        input: "s = bbbbb",
        output: "1",
        explanation: "Only one distinct character can remain in window.",
      },
    ],
    relatedTopics: ["String", "Sliding Window", "Hash Map"],
  },
  {
    topicSlug: "sliding-window",
    levelSlug: "advanced",
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    averageMinutes: 30,
    summary: "Find the smallest window containing all required characters.",
    prompt:
      "Given strings s and t, return the shortest substring of s that contains all characters in t with correct multiplicity.",
    sampleCases: [
      {
        input: "s = ADOBECODEBANC, t = ABC",
        output: "BANC",
        explanation: "BANC is the minimal valid window.",
      },
      {
        input: "s = a, t = aa",
        output: "",
        explanation: "No substring contains all required characters.",
      },
    ],
    relatedTopics: ["String", "Sliding Window", "Hash Map"],
  },

  {
    topicSlug: "stack-queues",
    levelSlug: "foundation",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    averageMinutes: 10,
    summary: "Validate bracket matching using a stack.",
    prompt:
      "Given a string containing only bracket characters, return true if brackets are balanced and properly nested.",
    sampleCases: [
      {
        input: "s = ()[]{}",
        output: "true",
        explanation: "Every opening bracket has a matching closing bracket.",
      },
      {
        input: "s = (]",
        output: "false",
        explanation: "Mismatched bracket types violate nesting rules.",
      },
    ],
    relatedTopics: ["String", "Stack"],
  },
  {
    topicSlug: "stack-queues",
    levelSlug: "intermediate",
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    averageMinutes: 19,
    summary: "Return days until a warmer temperature for each index.",
    prompt:
      "Given an array of temperatures, return an array where each element is the number of days until a warmer temperature appears.",
    sampleCases: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
        explanation: "Use a monotonic decreasing stack of indices.",
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
        explanation: "Each day except the last has a warmer future day.",
      },
    ],
    relatedTopics: ["Array", "Monotonic Stack"],
  },
  {
    topicSlug: "stack-queues",
    levelSlug: "advanced",
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    averageMinutes: 31,
    summary: "Compute max rectangle area formed by consecutive bars.",
    prompt:
      "Given bar heights of a histogram, return the area of the largest rectangle that can be formed.",
    sampleCases: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation: "Bars 5 and 6 form rectangle area 10.",
      },
      {
        input: "heights = [2,4]",
        output: "4",
        explanation: "Best rectangle uses height 4 and width 1.",
      },
    ],
    relatedTopics: ["Array", "Stack", "Monotonic Stack"],
  },

  {
    topicSlug: "binary-search",
    levelSlug: "foundation",
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    averageMinutes: 9,
    summary: "Find target index in sorted array.",
    prompt:
      "Given a sorted integer array nums and target, return its index if found, otherwise return -1.",
    sampleCases: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "Target 9 is located at index 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "Target is absent from the sorted array.",
      },
    ],
    relatedTopics: ["Array", "Binary Search"],
  },
  {
    topicSlug: "binary-search",
    levelSlug: "intermediate",
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    averageMinutes: 20,
    summary: "Locate target in rotated sorted array in logarithmic time.",
    prompt:
      "Given a rotated sorted array with distinct values, return the index of target if present, else return -1.",
    sampleCases: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "Target lies in the rotated right segment.",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
        explanation: "Target does not exist in array.",
      },
    ],
    relatedTopics: ["Array", "Binary Search"],
  },
  {
    topicSlug: "binary-search",
    levelSlug: "advanced",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    averageMinutes: 34,
    summary: "Find median in O(log(m+n)) by partitioning both arrays.",
    prompt:
      "Given two sorted arrays nums1 and nums2, return the median of the combined sorted sequence in logarithmic time.",
    sampleCases: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "Merged order [1,2,3] has median 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
        explanation: "Merged order [1,2,3,4] has median (2+3)/2.",
      },
    ],
    relatedTopics: ["Array", "Binary Search", "Partitioning"],
  },

  {
    topicSlug: "linked-list",
    levelSlug: "foundation",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    averageMinutes: 11,
    summary: "Reverse pointers in a singly linked list.",
    prompt:
      "Given the head of a singly linked list, reverse the list and return the new head.",
    sampleCases: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "All next pointers are flipped.",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Two-node list reverses directly.",
      },
    ],
    relatedTopics: ["Linked List", "Pointers"],
  },
  {
    topicSlug: "linked-list",
    levelSlug: "intermediate",
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    averageMinutes: 21,
    summary: "Add numbers represented by reversed linked lists.",
    prompt:
      "Given two non-empty linked lists representing non-negative integers in reverse digit order, return their sum as a linked list.",
    sampleCases: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "0 + 0 remains 0.",
      },
    ],
    relatedTopics: ["Linked List", "Math", "Carry Propagation"],
  },
  {
    topicSlug: "linked-list",
    levelSlug: "advanced",
    slug: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    averageMinutes: 32,
    summary: "Merge multiple sorted linked lists into one sorted list.",
    prompt:
      "Given an array of sorted linked lists, merge them into one sorted linked list and return its head.",
    sampleCases: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "Use min-heap or divide and conquer merging.",
      },
      {
        input: "lists = []",
        output: "[]",
        explanation: "No lists means empty result.",
      },
    ],
    relatedTopics: ["Linked List", "Divide and Conquer", "Heap"],
  },

  {
    topicSlug: "trees",
    levelSlug: "foundation",
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    averageMinutes: 10,
    summary: "Return maximum root-to-leaf depth.",
    prompt: "Given the root of a binary tree, return its maximum depth.",
    sampleCases: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "Longest path includes three nodes.",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "Right-skewed tree has depth 2.",
      },
    ],
    relatedTopics: ["Tree", "DFS", "Recursion"],
  },
  {
    topicSlug: "trees",
    levelSlug: "intermediate",
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    averageMinutes: 20,
    summary: "Check whether a binary tree satisfies BST ordering.",
    prompt:
      "Given a binary tree, determine whether it is a valid binary search tree.",
    sampleCases: [
      {
        input: "root = [2,1,3]",
        output: "true",
        explanation: "All nodes satisfy BST constraints.",
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "Node 3 violates the global BST range under root 5.",
      },
    ],
    relatedTopics: ["Tree", "DFS", "Binary Search Tree"],
  },
  {
    topicSlug: "trees",
    levelSlug: "advanced",
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    averageMinutes: 33,
    summary: "Find maximum path sum where path can start and end anywhere.",
    prompt:
      "Given a non-empty binary tree, return the maximum path sum over any valid node-to-node path.",
    sampleCases: [
      {
        input: "root = [1,2,3]",
        output: "6",
        explanation: "Best path is 2 -> 1 -> 3.",
      },
      {
        input: "root = [-10,9,20,null,null,15,7]",
        output: "42",
        explanation: "Best path is 15 -> 20 -> 7.",
      },
    ],
    relatedTopics: ["Tree", "DFS", "Dynamic Programming on Trees"],
  },

  {
    topicSlug: "tries",
    levelSlug: "foundation",
    slug: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Easy",
    averageMinutes: 14,
    summary: "Build insert/search/prefix operations with a trie.",
    prompt:
      "Implement a trie class supporting insert, search, and startsWith operations.",
    sampleCases: [
      {
        input:
          "operations = [insert apple, search apple, search app, startsWith app]",
        output: "[null,true,false,true]",
        explanation: "search app fails until app itself is inserted.",
      },
      {
        input: "operations = [insert app, search app]",
        output: "[null,true]",
        explanation: "Inserted exact word should be found.",
      },
    ],
    relatedTopics: ["String", "Trie", "Design"],
  },
  {
    topicSlug: "tries",
    levelSlug: "intermediate",
    slug: "design-add-and-search-words",
    title: "Design Add and Search Words",
    difficulty: "Medium",
    averageMinutes: 23,
    summary: "Support wildcard lookups over inserted words.",
    prompt:
      "Design a data structure that supports addWord and search where search queries may contain '.' wildcard characters.",
    sampleCases: [
      {
        input:
          "operations = [addWord bad, addWord dad, addWord mad, search pad, search .ad, search b..]",
        output: "[null,null,null,false,true,true]",
        explanation: "Wildcard '.' matches any single character.",
      },
      {
        input: "operations = [addWord a, addWord ab, search a.]",
        output: "[null,null,true]",
        explanation: "a. matches ab.",
      },
    ],
    relatedTopics: ["String", "Trie", "DFS"],
  },
  {
    topicSlug: "tries",
    levelSlug: "advanced",
    slug: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    averageMinutes: 35,
    summary: "Find all dictionary words present in a board.",
    prompt:
      "Given a character board and a word list, return all words that can be formed by adjacent cells without reusing a cell in one word.",
    sampleCases: [
      {
        input:
          "board = [[o,a,a,n],[e,t,a,e],[i,h,k,r],[i,f,l,v]], words = [oath,pea,eat,rain]",
        output: "[eat,oath]",
        explanation: "Trie-guided DFS prunes invalid branches.",
      },
      {
        input: "board = [[a,b],[c,d]], words = [abcb]",
        output: "[]",
        explanation: "Cell reuse is not allowed, so no valid path exists.",
      },
    ],
    relatedTopics: ["Trie", "Backtracking", "DFS"],
  },

  {
    topicSlug: "heap-priority-queue",
    levelSlug: "foundation",
    slug: "kth-largest-element-in-a-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    averageMinutes: 15,
    summary: "Maintain kth largest value as new numbers arrive.",
    prompt:
      "Design a class that accepts a stream of integers and returns the kth largest value after each insertion.",
    sampleCases: [
      {
        input: "k = 3, nums = [4,5,8,2], adds = [3,5,10,9,4]",
        output: "[4,5,5,8,8]",
        explanation: "A size-k min-heap tracks kth largest element.",
      },
      {
        input: "k = 1, nums = [], adds = [-3,-2,-4,0,4]",
        output: "[-3,-2,-2,0,4]",
        explanation: "With k=1, structure always returns current maximum.",
      },
    ],
    relatedTopics: ["Heap", "Priority Queue", "Design"],
  },
  {
    topicSlug: "heap-priority-queue",
    levelSlug: "intermediate",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    averageMinutes: 21,
    summary: "Return k elements with highest frequency.",
    prompt:
      "Given an integer array nums and integer k, return the k most frequent elements in any order.",
    sampleCases: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
        explanation: "1 appears three times and 2 appears twice.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "Single value is automatically top frequent.",
      },
    ],
    relatedTopics: ["Array", "Hash Map", "Heap", "Bucket Sort"],
  },
  {
    topicSlug: "heap-priority-queue",
    levelSlug: "advanced",
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    averageMinutes: 33,
    summary: "Maintain streaming median with balanced heaps.",
    prompt:
      "Design a data structure with addNum and findMedian operations for a stream of integers.",
    sampleCases: [
      {
        input:
          "operations = [addNum 1, addNum 2, findMedian, addNum 3, findMedian]",
        output: "[null,null,1.5,null,2.0]",
        explanation: "Two heaps maintain lower and upper halves.",
      },
      {
        input: "operations = [addNum -1, findMedian]",
        output: "[null,-1.0]",
        explanation: "Single element median is the element itself.",
      },
    ],
    relatedTopics: ["Heap", "Priority Queue", "Design"],
  },

  {
    topicSlug: "backtracking",
    levelSlug: "foundation",
    slug: "subsets",
    title: "Subsets",
    difficulty: "Easy",
    averageMinutes: 14,
    summary: "Generate all possible subsets of unique numbers.",
    prompt:
      "Given an integer array of unique elements, return all possible subsets (the power set).",
    sampleCases: [
      {
        input: "nums = [1,2,3]",
        output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
        explanation: "Each element is either included or excluded.",
      },
      {
        input: "nums = [0]",
        output: "[[],[0]]",
        explanation: "Single element yields two subsets.",
      },
    ],
    relatedTopics: ["Array", "Backtracking", "Bitmask"],
  },
  {
    topicSlug: "backtracking",
    levelSlug: "intermediate",
    slug: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    averageMinutes: 24,
    summary: "Find combinations of numbers summing to target.",
    prompt:
      "Given distinct candidate numbers and a target, return all unique combinations where selected numbers sum to target. A candidate may be chosen multiple times.",
    sampleCases: [
      {
        input: "candidates = [2,3,6,7], target = 7",
        output: "[[2,2,3],[7]]",
        explanation: "Both combinations reach target exactly.",
      },
      {
        input: "candidates = [2,3,5], target = 8",
        output: "[[2,2,2,2],[2,3,3],[3,5]]",
        explanation: "Backtracking with pruning avoids invalid branches.",
      },
    ],
    relatedTopics: ["Array", "Backtracking", "DFS"],
  },
  {
    topicSlug: "backtracking",
    levelSlug: "advanced",
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    averageMinutes: 34,
    summary: "Place n queens so none attack each other.",
    prompt:
      "Given an integer n, return all valid board configurations where n queens can be placed without sharing a row, column, or diagonal.",
    sampleCases: [
      {
        input: "n = 4",
        output: "2 solutions",
        explanation: "There are exactly two valid board arrangements.",
      },
      {
        input: "n = 1",
        output: "1 solution",
        explanation: "Single queen on single cell is valid.",
      },
    ],
    relatedTopics: ["Backtracking", "DFS", "Matrix"],
  },

  {
    topicSlug: "graphs",
    levelSlug: "foundation",
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Easy",
    averageMinutes: 16,
    summary: "Count connected components of land cells in a grid.",
    prompt:
      "Given a 2D grid of '1' and '0', return the number of connected islands where adjacency is vertical or horizontal.",
    sampleCases: [
      {
        input: "grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]",
        output: "1",
        explanation: "All land cells belong to one connected component.",
      },
      {
        input: "grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]",
        output: "3",
        explanation: "There are three separate island groups.",
      },
    ],
    relatedTopics: ["Graph", "Matrix", "DFS", "BFS"],
  },
  {
    topicSlug: "graphs",
    levelSlug: "intermediate",
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    averageMinutes: 22,
    summary: "Deep-copy graph while preserving adjacency structure.",
    prompt:
      "Given a reference node in an undirected connected graph, return a deep copy of the graph.",
    sampleCases: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "Cloned graph must preserve neighbor relations.",
      },
      {
        input: "adjList = [[]]",
        output: "[[]]",
        explanation: "Single isolated node remains isolated after cloning.",
      },
    ],
    relatedTopics: ["Graph", "DFS", "BFS", "Hash Map"],
  },
  {
    topicSlug: "graphs",
    levelSlug: "advanced",
    slug: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Hard",
    averageMinutes: 31,
    summary: "Compute signal time to reach all nodes from a source.",
    prompt:
      "Given travel times as directed weighted edges, return the time for all nodes to receive a signal from source k, or -1 if impossible.",
    sampleCases: [
      {
        input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
        output: "2",
        explanation: "Farthest node receives signal after 2 units.",
      },
      {
        input: "times = [[1,2,1]], n = 2, k = 2",
        output: "-1",
        explanation: "Source cannot reach node 1.",
      },
    ],
    relatedTopics: ["Graph", "Shortest Path", "Dijkstra"],
  },

  {
    topicSlug: "dynamic-programming",
    levelSlug: "foundation",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    averageMinutes: 10,
    summary: "Count distinct ways to climb n steps with 1 or 2 moves.",
    prompt:
      "Given n steps, return how many distinct ways there are to reach the top if you can climb 1 or 2 steps at a time.",
    sampleCases: [
      {
        input: "n = 2",
        output: "2",
        explanation: "[1+1] and [2] are valid ways.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "[1+1+1], [1+2], and [2+1].",
      },
    ],
    relatedTopics: ["Dynamic Programming", "Recurrence"],
  },
  {
    topicSlug: "dynamic-programming",
    levelSlug: "intermediate",
    slug: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    averageMinutes: 24,
    summary: "Maximize robbery amount in circular neighborhood.",
    prompt:
      "Given money in circularly arranged houses, return the maximum amount you can rob without taking adjacent houses.",
    sampleCases: [
      {
        input: "nums = [2,3,2]",
        output: "3",
        explanation: "Best choice is house with value 3.",
      },
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Choose houses 1 and 3 for total 4.",
      },
    ],
    relatedTopics: ["Dynamic Programming", "Array"],
  },
  {
    topicSlug: "dynamic-programming",
    levelSlug: "advanced",
    slug: "edit-distance",
    title: "Edit Distance",
    difficulty: "Hard",
    averageMinutes: 34,
    summary: "Find minimum insert/delete/replace operations between strings.",
    prompt:
      "Given word1 and word2, return the minimum number of operations required to convert word1 to word2.",
    sampleCases: [
      {
        input: "word1 = horse, word2 = ros",
        output: "3",
        explanation: "horse -> rorse -> rose -> ros.",
      },
      {
        input: "word1 = intention, word2 = execution",
        output: "5",
        explanation: "Optimal sequence requires five edits.",
      },
    ],
    relatedTopics: ["Dynamic Programming", "String"],
  },

  {
    topicSlug: "greedy",
    levelSlug: "foundation",
    slug: "assign-cookies",
    title: "Assign Cookies",
    difficulty: "Easy",
    averageMinutes: 11,
    summary: "Maximize satisfied children with available cookie sizes.",
    prompt:
      "Given children greed factors and cookie sizes, return the maximum number of children that can be satisfied.",
    sampleCases: [
      {
        input: "g = [1,2,3], s = [1,1]",
        output: "1",
        explanation: "Only one child can be satisfied.",
      },
      {
        input: "g = [1,2], s = [1,2,3]",
        output: "2",
        explanation: "Both children can receive suitable cookies.",
      },
    ],
    relatedTopics: ["Greedy", "Sorting", "Two Pointers"],
  },
  {
    topicSlug: "greedy",
    levelSlug: "intermediate",
    slug: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    averageMinutes: 20,
    summary: "Find minimum jumps to reach last index.",
    prompt:
      "Given an array where each element is maximum jump length at that position, return the minimum number of jumps to reach the last index.",
    sampleCases: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
        explanation: "Optimal route is index 0 -> 1 -> 4.",
      },
      {
        input: "nums = [2,3,0,1,4]",
        output: "2",
        explanation:
          "Greedy frontier expansion still reaches end in two jumps.",
      },
    ],
    relatedTopics: ["Greedy", "Array"],
  },
  {
    topicSlug: "greedy",
    levelSlug: "advanced",
    slug: "candy",
    title: "Candy",
    difficulty: "Hard",
    averageMinutes: 29,
    summary: "Distribute minimum candies under rating constraints.",
    prompt:
      "Given ratings of children in a line, distribute candies so each child has at least one candy and higher-rated children have more candies than neighbors. Return minimum candies needed.",
    sampleCases: [
      {
        input: "ratings = [1,0,2]",
        output: "5",
        explanation: "Distribution [2,1,2] satisfies all rules.",
      },
      {
        input: "ratings = [1,2,2]",
        output: "4",
        explanation: "Distribution [1,2,1] is minimal and valid.",
      },
    ],
    relatedTopics: ["Greedy", "Array", "Two-pass"],
  },

  {
    topicSlug: "intervals",
    levelSlug: "foundation",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Easy",
    averageMinutes: 14,
    summary: "Merge overlapping intervals after sorting by start time.",
    prompt:
      "Given an array of intervals, merge all overlapping intervals and return non-overlapping result covering same ranges.",
    sampleCases: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "[1,3] and [2,6] overlap and merge.",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Touching intervals are merged into one range.",
      },
    ],
    relatedTopics: ["Intervals", "Sorting"],
  },
  {
    topicSlug: "intervals",
    levelSlug: "intermediate",
    slug: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    averageMinutes: 21,
    summary: "Insert and merge a new interval into sorted list.",
    prompt:
      "Given non-overlapping intervals sorted by start time and a new interval, insert it and merge if necessary.",
    sampleCases: [
      {
        input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
        output: "[[1,5],[6,9]]",
        explanation: "New interval overlaps first interval.",
      },
      {
        input:
          "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
        explanation: "New interval merges with consecutive overlaps.",
      },
    ],
    relatedTopics: ["Intervals", "Array"],
  },
  {
    topicSlug: "intervals",
    levelSlug: "advanced",
    slug: "employee-free-time",
    title: "Employee Free Time",
    difficulty: "Hard",
    averageMinutes: 31,
    summary: "Find common free intervals across all schedules.",
    prompt:
      "Given schedules for multiple employees as sorted non-overlapping intervals, return finite intervals when all employees are free.",
    sampleCases: [
      {
        input: "schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]",
        output: "[[3,4]]",
        explanation: "All employees are free between 3 and 4.",
      },
      {
        input: "schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]",
        output: "[[5,6],[7,9]]",
        explanation: "Common finite free slots are [5,6] and [7,9].",
      },
    ],
    relatedTopics: ["Intervals", "Sweep Line", "Heap"],
  },

  {
    topicSlug: "bit-manipulation",
    levelSlug: "foundation",
    slug: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    averageMinutes: 9,
    summary: "Find element that appears once when others appear twice.",
    prompt:
      "Given a non-empty integer array where every element appears twice except one, return that single one.",
    sampleCases: [
      {
        input: "nums = [2,2,1]",
        output: "1",
        explanation: "XOR cancels duplicate pairs.",
      },
      {
        input: "nums = [4,1,2,1,2]",
        output: "4",
        explanation: "Only 4 is unpaired.",
      },
    ],
    relatedTopics: ["Bit Manipulation", "XOR"],
  },
  {
    topicSlug: "bit-manipulation",
    levelSlug: "intermediate",
    slug: "counting-bits",
    title: "Counting Bits",
    difficulty: "Medium",
    averageMinutes: 17,
    summary: "Return bit-count array from 0 to n.",
    prompt:
      "Given an integer n, return an array answer where answer[i] is the number of 1 bits in i for 0 <= i <= n.",
    sampleCases: [
      {
        input: "n = 2",
        output: "[0,1,1]",
        explanation: "Bit counts for 0,1,2 are 0,1,1.",
      },
      {
        input: "n = 5",
        output: "[0,1,1,2,1,2]",
        explanation: "Use DP relation with i >> 1 or lowest set bit.",
      },
    ],
    relatedTopics: ["Bit Manipulation", "Dynamic Programming"],
  },
  {
    topicSlug: "bit-manipulation",
    levelSlug: "advanced",
    slug: "maximum-xor-of-two-numbers-in-an-array",
    title: "Maximum XOR of Two Numbers in an Array",
    difficulty: "Hard",
    averageMinutes: 30,
    summary: "Find maximum XOR achievable from any pair.",
    prompt:
      "Given an integer array nums, return the maximum value of nums[i] XOR nums[j] where 0 <= i < j < nums.length.",
    sampleCases: [
      {
        input: "nums = [3,10,5,25,2,8]",
        output: "28",
        explanation: "Maximum XOR is 5 XOR 25 = 28.",
      },
      {
        input: "nums = [0]",
        output: "0",
        explanation: "Only one number gives XOR 0 with itself conceptually.",
      },
    ],
    relatedTopics: ["Bit Manipulation", "Trie", "Greedy"],
  },

  {
    topicSlug: "math-geometry",
    levelSlug: "foundation",
    slug: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    averageMinutes: 8,
    summary: "Determine whether an integer reads same backwards.",
    prompt:
      "Given an integer x, return true if x is a palindrome integer and false otherwise.",
    sampleCases: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads same forward and backward.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation: "Negative sign breaks palindrome symmetry.",
      },
    ],
    relatedTopics: ["Math", "Number Theory"],
  },
  {
    topicSlug: "math-geometry",
    levelSlug: "intermediate",
    slug: "powx-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    averageMinutes: 19,
    summary: "Compute x raised to n using fast exponentiation.",
    prompt: "Implement pow(x, n) that calculates x to the power n efficiently.",
    sampleCases: [
      {
        input: "x = 2.0, n = 10",
        output: "1024.0",
        explanation: "2 raised to 10 equals 1024.",
      },
      {
        input: "x = 2.1, n = 3",
        output: "9.261",
        explanation: "2.1 * 2.1 * 2.1 = 9.261.",
      },
    ],
    relatedTopics: ["Math", "Recursion", "Binary Exponentiation"],
  },
  {
    topicSlug: "math-geometry",
    levelSlug: "advanced",
    slug: "integer-to-english-words",
    title: "Integer to English Words",
    difficulty: "Hard",
    averageMinutes: 32,
    summary: "Convert integer to properly formatted English phrase.",
    prompt:
      "Given a non-negative integer num, return its English words representation.",
    sampleCases: [
      {
        input: "num = 123",
        output: "One Hundred Twenty Three",
        explanation: "Break number into hundred and tens chunks.",
      },
      {
        input: "num = 12345",
        output: "Twelve Thousand Three Hundred Forty Five",
        explanation: "Handle thousand groups with correct wording.",
      },
    ],
    relatedTopics: ["Math", "String", "Simulation"],
  },
];

const TOPIC_BY_SLUG = new Map(
  ROADMAP_TOPICS.map((topic) => [topic.slug, topic]),
);

const TOPIC_ORDER = new Map(
  ROADMAP_TOPICS.map((topic) => [topic.slug, topic.order]),
);

const LEVEL_ORDER = new Map<RoadmapLevelSlug, number>(
  ROADMAP_LEVELS.map((level, index) => [level.slug, index]),
);

function toCamelCase(value: string) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part, index) =>
      index === 0
        ? part.toLowerCase()
        : part[0].toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join("");
}

function toSnakeCase(value: string) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.toLowerCase())
    .join("_");
}

function makeQuestionId(topicSlug: string, questionSlug: string) {
  return `q_${toSnakeCase(topicSlug)}_${toSnakeCase(questionSlug)}`;
}

function buildStarterCode(questionSlug: string, title: string) {
  const functionName = toCamelCase(questionSlug);
  const pythonName = toSnakeCase(questionSlug);

  return {
    python: `import sys\n\ndef ${pythonName}(input_data):\n    return ""\n\nif __name__ == "__main__":\n    print(${pythonName}(sys.stdin.read()), end="")`,
    javascript: `const fs = require("fs");\n\nfunction ${functionName}(input) {\n  return "";\n}\n\nconst stdinData = fs.readFileSync(0, "utf8");\nprocess.stdout.write(String(${functionName}(stdinData)));`,
    java: `public class Main {\n  static String ${functionName}(String input) {\n    return input;\n  }\n\n  public static void main(String[] args) throws Exception {\n    java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(System.in));\n    StringBuilder input = new StringBuilder();\n    String line;\n\n    while ((line = reader.readLine()) != null) {\n      if (input.length() > 0) {\n        input.append('\\n');\n      }\n      input.append(line);\n    }\n\n    System.out.print(${functionName}(input.toString()));\n  }\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nstring ${functionName}(const string& input) {\n  return input;\n}\n\nint main() {\n  ios::sync_with_stdio(false);\n  cin.tie(nullptr);\n\n  string data((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());\n  cout << ${functionName}(data);\n  return 0;\n}`,
    c: `#include <stdio.h>\n\nint main(void) {\n  int ch;\n\n  while ((ch = getchar()) != EOF) {\n    putchar(ch);\n  }\n\n  return 0;\n}`,
  } satisfies Partial<Record<SupportedLanguageId, string>>;
}

function buildStatement(seed: QuestionSeed, levelSlug: RoadmapLevelSlug) {
  return [seed.prompt, LEVEL_GUIDANCE[levelSlug]];
}

function buildRelatedTopics(seed: QuestionSeed, topic: DsaTopic) {
  return Array.from(new Set([topic.name, ...seed.relatedTopics]));
}

function buildJudgeTokens(seed: QuestionSeed) {
  const camel = toCamelCase(seed.slug).toLowerCase();
  const snake = toSnakeCase(seed.slug);
  const condensed = seed.slug.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return Array.from(new Set([camel, snake, condensed]));
}

function buildQuestion(seed: QuestionSeed): DsaQuestion {
  const topic = TOPIC_BY_SLUG.get(seed.topicSlug);

  if (!topic) {
    throw new Error(`Unknown topic slug: ${seed.topicSlug}`);
  }

  return {
    id: makeQuestionId(seed.topicSlug, seed.slug),
    slug: `${seed.topicSlug}-${seed.slug}`,
    topicSlug: seed.topicSlug,
    levelSlug: seed.levelSlug,
    title: seed.title,
    difficulty: seed.difficulty,
    averageMinutes: seed.averageMinutes,
    summary: seed.summary,
    statement: buildStatement(seed, seed.levelSlug),
    constraints: seed.constraints ?? DEFAULT_CONSTRAINTS[seed.difficulty],
    examples: seed.sampleCases.map((sample, index) => ({
      title: `Example ${index + 1}`,
      input: sample.input,
      output: sample.output,
      explanation: sample.explanation,
    })),
    relatedTopics: buildRelatedTopics(seed, topic),
    judgeTokens: buildJudgeTokens(seed),
    starterCode: buildStarterCode(seed.slug, seed.title),
    testCases: seed.sampleCases.map((sample, index) => ({
      id: index + 1,
      title: `Case ${index + 1}`,
      input: sample.input,
      expectedOutput: sample.output,
    })),
  };
}

export const DSA_QUESTIONS: DsaQuestion[] = QUESTION_SEEDS.map((seed) =>
  buildQuestion(seed),
).sort((first, second) => {
  const topicDelta =
    (TOPIC_ORDER.get(first.topicSlug) ?? Number.MAX_SAFE_INTEGER) -
    (TOPIC_ORDER.get(second.topicSlug) ?? Number.MAX_SAFE_INTEGER);

  if (topicDelta !== 0) {
    return topicDelta;
  }

  const levelDelta =
    (LEVEL_ORDER.get(first.levelSlug) ?? Number.MAX_SAFE_INTEGER) -
    (LEVEL_ORDER.get(second.levelSlug) ?? Number.MAX_SAFE_INTEGER);

  if (levelDelta !== 0) {
    return levelDelta;
  }

  return first.title.localeCompare(second.title);
});

export function getTopicBySlug(topicSlug?: string | null) {
  if (!topicSlug) {
    return undefined;
  }
  return ROADMAP_TOPICS.find((topic) => topic.slug === topicSlug);
}

export function getRoadmapLevelBySlug(levelSlug?: string | null) {
  if (!levelSlug) {
    return undefined;
  }
  return ROADMAP_LEVELS.find((level) => level.slug === levelSlug);
}

export function getQuestionsByTopic(topicSlug: string) {
  return DSA_QUESTIONS.filter((question) => question.topicSlug === topicSlug);
}

export function getQuestionsByTopicAndLevel(
  topicSlug: string,
  levelSlug: RoadmapLevelSlug,
) {
  return DSA_QUESTIONS.filter(
    (question) =>
      question.topicSlug === topicSlug && question.levelSlug === levelSlug,
  );
}

export function getQuestionBySlug(questionSlug?: string | null) {
  if (!questionSlug) {
    return undefined;
  }

  return DSA_QUESTIONS.find((question) => question.slug === questionSlug);
}

export function countQuestionsForTopicLevel(
  topicSlug: string,
  levelSlug: RoadmapLevelSlug,
) {
  return getQuestionsByTopicAndLevel(topicSlug, levelSlug).length;
}

export function resolveRoadmapSelection(input?: {
  topicSlug?: string | null;
  levelSlug?: string | null;
  questionSlug?: string | null;
}) {
  const directQuestion = getQuestionBySlug(input?.questionSlug);

  const topic =
    (directQuestion
      ? getTopicBySlug(directQuestion.topicSlug)
      : getTopicBySlug(input?.topicSlug)) ?? ROADMAP_TOPICS[0];

  let level =
    (directQuestion
      ? getRoadmapLevelBySlug(directQuestion.levelSlug)
      : getRoadmapLevelBySlug(input?.levelSlug)) ?? ROADMAP_LEVELS[0];

  let questions = getQuestionsByTopicAndLevel(topic.slug, level.slug);

  let question =
    directQuestion &&
    directQuestion.topicSlug === topic.slug &&
    directQuestion.levelSlug === level.slug
      ? directQuestion
      : questions[0];

  if (!question) {
    const fallback = getQuestionsByTopic(topic.slug)[0] ?? DSA_QUESTIONS[0];
    level = getRoadmapLevelBySlug(fallback.levelSlug) ?? ROADMAP_LEVELS[0];
    questions = getQuestionsByTopicAndLevel(topic.slug, level.slug);
    question = fallback;
  }

  return {
    topic,
    level,
    questions,
    question,
  };
}

function makeMermaidNodeId(topicSlug: string, levelSlug: string) {
  return `${topicSlug.replace(/[^a-z0-9]+/gi, "_")}_${levelSlug}`;
}

export function buildRoadmapMermaidDefinition(basePath = "/quandary") {
  const lines: string[] = [
    "flowchart TB",
    "classDef topic fill:#d9f4ee,stroke:#1f6f64,color:#123733,stroke-width:2px",
    "classDef level fill:#edf7f4,stroke:#3f7f74,color:#1a3d37,stroke-width:1.4px",
  ];

  const topicNodeIds = ROADMAP_TOPICS.map((topic) => `topic_${topic.order}`);

  lines.push(
    topicNodeIds
      .map(
        (nodeId, index) =>
          `${nodeId}["${index + 1}. ${ROADMAP_TOPICS[index].name}"]:::topic`,
      )
      .join(" --> "),
  );

  for (const topic of ROADMAP_TOPICS) {
    const topicNodeId = `topic_${topic.order}`;
    const levelNodes = ROADMAP_LEVELS.map((level) => ({
      level,
      nodeId: makeMermaidNodeId(topic.slug, level.slug),
      count: countQuestionsForTopicLevel(topic.slug, level.slug),
    }));

    lines.push(
      `${topicNodeId} --> ${levelNodes[0].nodeId}["${levelNodes[0].level.shortLabel} ${levelNodes[0].level.label} (${levelNodes[0].count}Q)"]:::level`,
    );
    lines.push(
      `${levelNodes[0].nodeId} --> ${levelNodes[1].nodeId}["${levelNodes[1].level.shortLabel} ${levelNodes[1].level.label} (${levelNodes[1].count}Q)"]:::level`,
    );
    lines.push(
      `${levelNodes[1].nodeId} --> ${levelNodes[2].nodeId}["${levelNodes[2].level.shortLabel} ${levelNodes[2].level.label} (${levelNodes[2].count}Q)"]:::level`,
    );

    for (const { level, nodeId } of levelNodes) {
      const href = `${basePath}?topic=${encodeURIComponent(topic.slug)}&level=${encodeURIComponent(level.slug)}`;
      lines.push(
        `click ${nodeId} "${href}" "Open ${topic.name} - ${level.label}"`,
      );
    }
  }

  return lines.join("\n");
}

export function getRoadmapStats() {
  const totalQuestions = DSA_QUESTIONS.length;
  const topicCount = ROADMAP_TOPICS.length;
  const levelCount = ROADMAP_LEVELS.length;

  const levelDistribution = ROADMAP_LEVELS.map((level) => ({
    level: level.slug,
    count: DSA_QUESTIONS.filter((question) => question.levelSlug === level.slug)
      .length,
  }));

  return {
    totalQuestions,
    topicCount,
    levelCount,
    levelDistribution,
  };
}

export function getTopicWithLevelSummary(topicSlug: string) {
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return undefined;
  }

  return {
    topic,
    levels: ROADMAP_LEVELS.map((level) => ({
      ...level,
      questions: getQuestionsByTopicAndLevel(topic.slug, level.slug),
    })),
  };
}
