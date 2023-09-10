// 功能：平展树状数组，转换为一层
export default function flattenTree(tree) {
  const result = []

  function flatten(node) {
    result.push(node)
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        flatten(child)
      })
    }
  }

  tree.forEach((node) => {
    flatten(node)
  })

  return result
}

// 功能：从对象中选出某些属性赋值给一个新对象
export const pick = (obj, arr) => {
  const result = arr.reduce((accumulator, currentVal) => {
    if (currentVal in obj) {
      accumulator[currentVal] = obj[currentVal]
    }
    return accumulator
  }, {})
  return result
}
