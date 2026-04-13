export interface BranchMarkProps {
  variant: 'personal' | 'blog-agent' | 'pice' | 'mcp-guard' | 'case-pilot'
  size?: number
  className?: string
}

interface Branch {
  trunk: 'left' | 'right'
  side: 'left' | 'right'
  y: number
}

const variantBranches: Record<BranchMarkProps['variant'], Branch[]> = {
  personal: [
    { trunk: 'left', side: 'left', y: 0.35 },
    { trunk: 'right', side: 'right', y: 0.65 },
  ],
  'blog-agent': [
    { trunk: 'left', side: 'left', y: 0.35 },
    { trunk: 'right', side: 'right', y: 0.4 },
    { trunk: 'right', side: 'right', y: 0.65 },
  ],
  pice: [
    { trunk: 'left', side: 'left', y: 0.35 },
    { trunk: 'left', side: 'left', y: 0.6 },
    { trunk: 'right', side: 'right', y: 0.5 },
  ],
  'mcp-guard': [
    { trunk: 'left', side: 'left', y: 0.5 },
    { trunk: 'right', side: 'right', y: 0.5 },
  ],
  'case-pilot': [
    { trunk: 'left', side: 'left', y: 0.35 },
    { trunk: 'left', side: 'left', y: 0.65 },
    { trunk: 'right', side: 'right', y: 0.35 },
    { trunk: 'right', side: 'right', y: 0.65 },
  ],
}

export function BranchMark({ variant, size = 36, className }: BranchMarkProps) {
  const sw = (2 / 36) * size
  const r = (4 / 36) * size
  const padding = (5 / 36) * size
  const leftTrunkX = size * 0.38
  const rightTrunkX = size * 0.62
  const trunkTop = padding
  const trunkBottom = size - padding
  const branchLen = (8 / 36) * size

  const branches = variantBranches[variant]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${variant} branch mark`}
    >
      <rect
        x={sw / 2}
        y={sw / 2}
        width={size - sw}
        height={size - sw}
        rx={r}
        fill="currentColor"
      />

      <line
        x1={leftTrunkX}
        y1={trunkTop}
        x2={leftTrunkX}
        y2={trunkBottom}
        stroke="var(--background)"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <line
        x1={rightTrunkX}
        y1={trunkTop}
        x2={rightTrunkX}
        y2={trunkBottom}
        stroke="var(--background)"
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {branches.map((branch, i) => {
        const trunkX = branch.trunk === 'left' ? leftTrunkX : rightTrunkX
        const y = padding + branch.y * (size - 2 * padding)
        const endX =
          branch.side === 'left' ? trunkX - branchLen : trunkX + branchLen

        return (
          <line
            key={i}
            x1={trunkX}
            y1={y}
            x2={endX}
            y2={y}
            stroke="var(--background)"
            strokeWidth={sw}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}
