<template>
  <div class="form-wrap">
    <div class="form">
      <h3 class="form-title">New Tickets</h3>
      <el-form ref="formNode" label-width="290px" :rules="rules" :model="formData" size="small">
        <el-form-item
          label="Summary:"
          prop="title"
        >
          <el-input class="w-744" type="text" v-model="formData.title" autocomplete="off" size="small" placeholder="Enter summary"></el-input>
        </el-form-item>
        <el-form-item
          label="Type:"
          prop="type"
        >
          <el-select v-model="formData.type" placeholder="Select type" size="small" class="w-372">
            <el-option 
            :value="item" 
            :label="TYPE[item]" 
            v-for="item in TYPE" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Severity:"
          prop="severity"
        >
          <el-select v-model="formData.severity" placeholder="Select severity" size="small" class="w-372">
            <el-option value="1" label="Urgency"></el-option>
            <el-option value="2" label="Slight"></el-option>
            <el-option value="3" label="None"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="isUrgency"
          label=""
          prop="reasonForUrgency"
        >
          <el-input class="w-744" type="text" v-model="formData.reasonForUrgency" autocomplete="off" size="small" placeholder="Reason For Urgency"></el-input>
        </el-form-item>
        <el-form-item
          label="Expected Solve Date:"
          prop="expectedSolveDate"
        >
          <el-date-picker
            class="w-372 date-picker"
            v-model="formData.expectedSolveDate"
            type="datetime"
            placeholder="Select date"
            prefix-icon="el-icon-date"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="SN:"
          prop="sn"
        >
          <el-input class="w-372" type="text" v-model="formData.sn" autocomplete="off" size="small" placeholder="Comma separated terminal SNs"></el-input>
        </el-form-item>
        <el-form-item
          label="Assignee:"
          prop="assignee"
        >
          Adminnnn
        </el-form-item>
        <el-form-item
          label="Copied:"
          prop="copiedAuto"
        >
          Adminnnn
        </el-form-item>
        <el-form-item
          label=""
          prop="copiedAuto"
        >
          <el-select v-model="formData.copiedManual" placeholder="Select copied" size="small" 
          multiple
          class="w-372">
            <el-option value="1" label="Tom"></el-option>
            <el-option value="2" label="Jack"></el-option>
            <el-option value="3" label="Rick"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Description:"
          prop="description"
        >
          <quill-editor class="form-quill-editor" v-model="formData.description">
          </quill-editor>
        </el-form-item>
      </el-form>

      
    </div>
    <div class="form-btn">
        <el-button @click="toCacnel">Cancel</el-button>
        <el-button type="primary" @click="toSubmit">Submit</el-button>
    </div>
  </div>
</template>

<script>
import {TYPE} from './utils/dict'
import {postTicket} from '@/api/ticket';
 
export default {
    data() {
      //标题的规则
      var titleRules = (rule, value, callback)=>{
        //rule 当前字段的规则信息
        //value 当前字段的值
        //callabck效验回调
        //标题只允许输入空格中文 英文 + - * ! ！。. ，,
        var reg = /^[\u4e00-\u9fa5a-zA-Z+\-\*\!\.\,！。，\s]+$/;
        if(value.trim() === ''){
          return callback(new Error('不能为空！'));
        }
        else if(!reg.test(value)){
          return callback(new Error('标题只允许输入中文 英文 + - * ! ！。. ，,'));
        }
      };

      var snRules = (rule, value, callback)=>{
        //如果sn写； 必须是8个或10个长度的数字
        var reg = /^([0-9]{8}|[0-9]{10})$/;
        var newValue = value.trim();//去除字符串左右两端的空格
        if(newValue.length != 0 && !reg.test(newValue)){
          return callback(new Error('sn选填，但必须是8个或10个长度的数字'));
        }
      }

      return {
        TYPE,

        formData:  { 
          title: '', 
          type: '', 
          severity: '', 
          reasonForUrgency: '', 
          expectedSolveDate: '', 
          sn: '', 
          assignee: 'Adminnnn', 
          copiedAuto: 'Adminnnn', 
          copiedManual: [], 
          description: '' 
        },

        rules: {
          sn: [
            { validator: snRules, trigger: ['change'] }
          ],
          title: [
            //标题只允许输入中文 英文 + - * ! ！。. ，,
            { required: true, validator: titleRules, trigger: ['change'] },
            { max: 40, message: '字符最多40个', trigger: ['change'] }
          ],
          type: [
            { required: true, message: '不能为空', trigger: ['change'] }
          ],
          severity: [
            { required: true, message: '不能为空', trigger: ['change'] }
          ],
          reasonForUrgency: [
            { required: true, message: '不能为空', trigger: ['change'] },
            { max: 40, message: '字符最多40个', trigger: ['change'] }
          ],
          expectedSolveDate: [
            { required: true, message: '不能为空', trigger: ['change'] },
          ],
          copiedAuto: [
            { required: true, message: '不能为空', trigger: ['change'] }
          ],
          copiedManual: [
            { required: true, message: '不能为空', trigger: ['change'] }
          ],
          description: [
            { required: true, message: '不能为空', trigger: ['change'] },
            { max: 1000000, message: '字符最多40个', trigger: ['change'] }
          ],
        }
      };
    },
    watch: {
      //监听属性
      ['formData.description'](newValue,oldValue){
        this.$refs.formNode.validateField('description');
      }
    },
    computed: {
      //计算属性
      isUrgency(){//等价isUrgency: ()=>{}
        //当formData.severity == '1'时，isUrgency才会是true，其他情况都是false
        return this.formData.severity == '1';
      }
    },
    methods: {
      toSubmit(){
        //提交表单，效验成功后，发送接口
        this.$refs.formNode.validate((valid,obj)=>{
          if(valid){
            console.log(this.formData)
            let copyFormData = JSON.parse(JSON.stringify(this.formData));//copy一份json对象
            copyFormData.expectedSolveDate = this.formData.expectedSolveDate.getTime();
            postTicket(copyFormData).then(res => {
              var id = res.data.data;
              this.$router.push(`/tickets/${id}`);
            }).catch(err=>{
              console.log(err);
            });
          }
        })
        
      },
      toCacnel(){
        //返回上一个页面
        this.$confirm('是否真要取消，返回到列表页?', '提示', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1);//返回上一个链接
        }).catch(() => {
                   
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
//::v-deep 属性选择器
.form-wrap{
  width: 1200px;
  margin: 15px auto 0;
  .form-btn{
    text-align: right;
    margin-top: 16px;
  }
}
::v-deep.form{
  box-sizing: border-box;
  width: 1200px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.15);
  .form-title{
    margin: 20px 23px 0 30px;
    padding-bottom: 19px;
    font-size: 22px;
    font-weight: normal;
    color: #5A5A5A;
    line-height: 28px;
    border-bottom: 1px solid #D6D6D6;
  }
  .el-form{
    margin-top: 21px;
    .el-form-item__label{
      padding-right: 13px;
      color: #000000;
    }
    .w-744{
      width: 744px;
    }
    .w-372{
      width: 372px;
    }
    .form-quill-editor{
      width: 744px;
      height: 205px;
      .ql-container{
        height: calc(100% - 82px);
      }
    }
    .date-picker{
      .el-input__inner{
        padding-left: 15px;
      }
      .el-input__prefix{
        right: 5px;
        left: auto;
      }
      .el-input__suffix{
          background: #fff;
          height: 30px;
          top: 2px;
          .el-input__suffix-inner{
            transform: translate(0,-1px);
            display: block;
          }
      }
    }
  }
}

 
</style>