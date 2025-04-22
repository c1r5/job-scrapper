export function get_env(key: string, default_value?: string): string {
  const value = process.env[key] || default_value

  if (!value) throw new Error(`environment variable ${key} not set`)

  return value
}