// 假设楼梯一共有 n 层。每次只能爬 1 步 或 2 步，问有多少种爬到楼顶的方法
// f(n) = f(n-1) + f(n-2)

// 方法1：记忆化搜索 自顶向下
// 用于存储不同楼层对应的解决办法个数
const f = []
// 定义爬楼梯方法
const climbStairs = function(n) {
  // 处理边界条件
  if(n==1) {
    return 1
  }
  if(n==2) {
    return 2
  }
  // 若 f(n) 不存在，则递归计算其值
  if(f[n]===undefined)  f[n] = climbStairs(n-1) + climbStairs(n-2)

  // 若 f(n) 已经有值，则直接返回
  return f[n]
};

// 方法2：动态规划 自底向上
const climbStairs1 = function(n) {
  // 初始化结果数组
  const f = [];
  f[1] = 1;
  f[2] = 2;
  // 动态更新每一层楼梯对应的结果
  for(let i = 3;i <= n;i++){
    f[i] = f[i-2] + f[i-1];
  }
  return f[n];
};