export default function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.93_0.11_205/.65),transparent_30%),radial-gradient(circle_at_88%_12%,oklch(0.91_0.14_145/.6),transparent_34%),radial-gradient(circle_at_50%_90%,oklch(0.95_0.08_55/.5),transparent_36%)] dark:bg-[radial-gradient(circle_at_15%_20%,oklch(0.36_0.08_232/.26),transparent_35%),radial-gradient(circle_at_88%_12%,oklch(0.39_0.1_170/.24),transparent_38%),radial-gradient(circle_at_50%_90%,oklch(0.3_0.08_285/.18),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,oklch(1_0_0/.78)_52%,oklch(1_0_0)_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,oklch(0.141_0.005_285.823/.8)_52%,oklch(0.141_0.005_285.823)_100%)]" />
    </div>
  );
}
