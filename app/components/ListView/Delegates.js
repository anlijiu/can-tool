
export const DelegateForMember = {
  isForViewType: (items, position) => items.find((item) => (item instanceof Member)) !== undefined
}
// export DelegateForMember

export default { DelegateForMember }
