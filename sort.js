const arr = [0, 3, 2, 6, 4, 7, 8, 9, 1]
/*
* 1.冒泡排序
* 每次比较两个相邻元素，若后面的小于前面的，则置换
* */
function bubbleSort (arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        const s = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = s
      }
    }
  }
  return arr
}

/*
* 2.选择排序
* 每次从index+1开始寻找最小值，把最小值放到index位置
* */
function selectionSort (arr) {
  let minIndex, temp;
  for(let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for(let j = i+1; j < arr.length; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
/*
* 3.插入排序
* 找到最小值，和每一个相邻元素比较，如果比前一个元素小，则向前置换
* */
function insertSort (arr) {
  let preIndex, current;
  for(let i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    current = arr[i]
    while (preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex] // 这一步arr[i]会被改变，所以要使用current
      preIndex--; // 为了下一步的preIndex + 1变成上一个元素
    }
    arr[preIndex + 1] = current
  }
  return arr
}
/*
* 4.快速排序
* 把原始的数组筛选成较小和较大的两个子数组，然后递归地排序两个子数组。
* */
// 快速排序入口
function quickSort(arr, left = 0, right = arr.length - 1) {
  // 定义递归边界，若数组只有一个元素，则没有排序必要
  if(arr.length > 1) {
    // lineIndex表示下一次划分左右子数组的索引位
    const lineIndex = partition(arr, left, right)
    // 如果左边子数组的长度不小于1，则递归快排这个子数组
    if(left < lineIndex-1) {
      // 左子数组以 lineIndex-1 为右边界
      quickSort(arr, left, lineIndex-1)
    }
    // 如果右边子数组的长度不小于1，则递归快排这个子数组
    if(lineIndex<right) {
      // 右子数组以 lineIndex 为左边界
      quickSort(arr, lineIndex, right)
    }
  }
  return arr
}
// 以基准值为轴心，划分左右子数组的过程
function partition(arr, left, right) {
  // 基准值默认取中间位置的元素
  let pivotValue = arr[Math.floor(left + (right-left)/2)]
  // 初始化左右指针
  let i = left
  let j = right
  // 当左右指针不越界时，循环执行以下逻辑
  while(i<=j) {
    // 左指针所指元素若小于基准值，则右移左指针
    while(arr[i] < pivotValue) {
      i++
    }
    // 右指针所指元素大于基准值，则左移右指针
    while(arr[j] > pivotValue) {
      j--
    }

    // 若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if(i<=j) {
      swap(arr, i, j)
      i++
      j--
    }

  }
  // 返回左指针索引作为下一次划分左右子数组的依据
  return i
}

// 快速排序中使用 swap 的地方比较多，我们提取成一个独立的函数
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}