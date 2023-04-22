export const glShaderTypes = ['VERTEX_SHADER', 'FRAGMENT_SHADER'] as const
export type glShaderTypesType = (typeof glShaderTypes)[number]
