export function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined && value !== null
}

export function defaultValue<T>(value: T | undefined, defaultValue: T): T {
    return isDefined(value) ? value : defaultValue
}

export const DataTypeHandle = {
    isString: (value: unknown): value is string => typeof value === 'string',
}