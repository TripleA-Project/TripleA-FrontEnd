interface IndexSignature {
  [key: string]: string;
}

export function enumObjectReverseMapping<T extends object>(targetEnum: T) {
  for (const [key, value] of Object.entries(targetEnum)) {
    (targetEnum as IndexSignature)[value] = key;
  }
}

export function enumObjectDeSerializeMapping<T extends object, R extends string>(
  targetEnum: T,
  map: Record<R, T[keyof T]>,
) {
  const mapEntries = Object.entries(map);

  for (const enumValue of Object.values(targetEnum)) {
    const [mappingKey, _] = mapEntries.find(([_, value]) => value === enumValue)!;

    // @ts-ignore
    targetEnum[enumValue] = mappingKey;
  }
}
