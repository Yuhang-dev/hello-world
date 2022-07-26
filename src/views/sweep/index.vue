<template>
  <div class="sweep">
      <div class="sweep-content">
          <ul :style="{ width: width * col + 'px' }">
             <li v-for="(item, key) in sweepData" :key="key" @click="clickHandle(item,key)" :class="{
                 open: item.status > 1,
                 'el-icon-s-flag': item.status == 2,
                 'question': item.status == 3,
                 'el-icon-sunny': item.status == 6,
             }">{{ item.status == 5 ? item.count : '' }}</li>
          </ul>
      </div>
      <div class="sweep-operator">
          <span class="sweep-count">{{count}}</span>
          <i class="sweep-icon el-icon-sunny"></i>
      </div>
  </div>
</template>

<script>
/***扫雷：          格子状态(status):        1.未翻开状态(class="")            
 *                                          4.翻开状态( class="open")
 * 
 *               未翻开状态(status)：        1.普通状态（可左键翻开）(class="")   
 *                                          2.插旗状态（不可左键翻开）( class="open el-icon-s-flag")    
 *                                          3.疑问状态（与普通状态无异，可左键翻开）( class="open question")    
 * 
 *  翻开状态（都不再允许点击）(status)：       4.无任何内容 ( class="open")        
 *                                           5.数字状态 ( class="open")       
 *                                           6.雷( class="open el-icon-sunny")
 * 
 *      
 *                            isBomb:       是否是炸弹格子，默认false          
 * 
 *    {
 *       'x,y': { status: 1,  isBomb: false, count: 0 }
 *    }
 * 
 * ***/

export default {
    data(){
        return {
            width: 28,//格子的宽度

            sweepData: {},//所有的格子数据对象

            row: 10, //几行
            col: 15, //几列
            count: 30, //雷的数量
        }
    },
    created(){
        this.initGame()
    },
    methods: {
        initGame(){

          //第一个翻开的区域不能为雷

            var coords = [];//记录所有的的坐标值集合[{x,y}]
            //生成对应格子的数据对象
            for(var y = 0; y < this.row; y++){
                for(var x = 0; x < this.col; x++ ){
                    coords.push({x,y})
                    this.$set(this.sweepData, x+','+y, { status: 1,  isBomb: false, count: 0 })
                }
            }
            
            //生成随机雷的坐标集合
            var bombCoords = this.createBombCoords(this.count, coords);
            
            //将雷状态写入到数据中
            bombCoords.forEach(item =>{
                var x = item.x;
                var y = item.y;
                this.sweepData[x+','+y].isBomb = true;
            });
  
            console.log(this.sweepData)
        },
        createBombCoords(count,coords){
            //生成随机雷的坐标集合
           var randomCoords = []
           for(var i = 0; i < count; i++){
               var randomPos = Math.floor(coords.length * Math.random());
               randomCoords.push(coords.splice(randomPos, 1)[0]);
           }

           return randomCoords;
        },
        roundData(x,y){
            //获取当前x,y周围8个格子的对象集合
            var arr = []
            for(var xx = x - 1; xx <= x + 1; xx++){
                for(var yy = y - 1; yy <= y + 1; yy++){
                    if(xx >= 0 && xx < this.col  && yy >=0 && yy < this.row){
                        if(xx == x && yy == y){
                            //排除自己
                            continue;
                        }
                        else{
                            arr.push({x: xx, y: yy, data: this.sweepData[xx + ',' +yy]});
                        }
                    }
                }
            }

            return arr;
        },
        recursionCoords(item,strCoords){
            //递归坐标数据
            var coords = strCoords.split(',');//字符串转为数组
            var x = Number(coords[0]);
            var y = Number(coords[1]);
            var roundArr = this.roundData(x,y);
            let bombCount = 0;
            roundArr.forEach(r => {
                if(r.data.isBomb){
                    bombCount++;
                }
            });

            if(bombCount == 0){
                item.status = 4;
                //todo ...
                // roundArr.forEach(r => {
                //     if(!r.data.isBomb){
                //         this.recursionCoords(r.data, r.x+','+r.y)
                //     }
                // });

                //需要清出周围相连所有安全的区域
            }
            else{
                item.status = 5;
                item.count = bombCount;
            }
        },
        clickHandle(item,strCoords){
            //点击格子触发的函数
            if(item.isBomb){
                item.status = 6;
                this.$alert('踩到雷了，输了！', {
                    confirmButtonText: '确定'
                });
                return
            }
            else{
                //正常未踩到雷
                this.recursionCoords(item,strCoords)
            }
        }
    }
}
</script>

<style lang="scss" scope>
.sweep{
    .sweep-content{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        ul{
            display: flex;
            flex-flow: wrap; //默认弹性盒子不换行，添加此属性内容宽度超出自动换行
            li{
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                width: 28px;
                height: 28px;
                border: 1px solid #000;
                list-style: none;
                background: #4d65cb;
                box-shadow: 1px 3px 14px 3px #0000006e;
                &.open{
                    color: #4251be;
                    background: #cad7ea;
                    font-weight: bold;
                }
                &.el-icon-sunny{
                    color: #656977;
                    font-weight: bold;
                }
                &.el-icon-s-flag{
                    color: #d21313;
                }
                &.question{
                    &:after{
                        content: '?';
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .sweep-operator{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .sweep-icon{
            font-size: 30px;
            margin-left: 10px;
        }
    }
}
</style>