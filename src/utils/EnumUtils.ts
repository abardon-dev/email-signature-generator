export const Enums = {
  getKeyFromValue<TEnumKey extends string, TEnumValue extends string | number>(
    myEnum: { [key in TEnumKey]: TEnumValue },
    value: TEnumValue
  ): TEnumKey {
    return Object.keys(myEnum)[Object.values(myEnum).indexOf(value)] as TEnumKey;
  }
};
