<script setup>
const initFormData
  = {
    id: null,
    uid: '',
    name: '',
    class: '',
    phone: '',
    problem: '',
    regTime: null,
    appTime: '',
    closed: false,
    closedTime: null,
  }
const formData = ref(initFormData)

const alertInfo = ref({
  info: '',
  error: '',
})

const loading = ref(false)

const requiredFields = [
  ['name', '请填写姓名'],
  ['uid', '请填写学号'],
  ['phone', '请填写电话'],
  ['class', '请填写班级'],
  ['problem', '请填写详情'],
  ['appTime', '请选择预约日期'],
]

function validate(payload) {
  const missing = requiredFields.find(([key]) => !payload[key])
  if (missing) {
    return missing[1]
  }
  if (String(payload.phone).length !== 11) {
    return '请填写11位电话'
  }
  if (String(payload.uid).length !== 11) {
    return '请填写11位学号'
  }
}

async function submit() {
  alertInfo.value = { info: '', error: '' }

  const message = validate(formData.value)
  if (message) {
    alertInfo.value.error = message
    return
  }

  loading.value = true
  try {
    await $fetch('/api/issues', {
      method: 'POST',
      body: formData.value,
    })
    alertInfo.value.info = '预约成功!!!'
    formData.value = { ...initFormData }
  }
  catch (error) {
    alertInfo.value.error = error.data?.message ?? '提交失败, 请稍后重试'
  }
  finally {
    loading.value = false
  }
}

const hasChecked = ref({
  userAgreement: false,
  triedMyself: false,
  describedInDetail: false,
  comeEarly: false,
})
</script>

<template>
  <div class="min-h-full flex items-center justify-center">
    <div class="max-w-lg gap-12 justify-center lg:flex lg:max-w-none">
      <div class="max-w-lg space-y-3 mx-4">
        <p class="font-semibold text-3xl">
          寻找我们提供帮助
        </p>
        <p class="text-base-content">
          &ensp;&ensp;&ensp;&ensp;电脑义务维修中心于2015年9月创办, 是计算机学院学生党支部旗下的一支公益性特色服务团队,
          以电脑维修工作为重点, 以丰富校园科技文化为己任. 为切实弘扬志愿服务精神,
          本中心无偿为全校师生提供电脑义务维修服务.
        </p>
        <p class="text-base-content">
          &ensp;&ensp;&ensp;&ensp;电脑义务维修中心为弘扬志愿服务精神, 无偿为师生提供电脑义务维修服务. 维修前,
          维修人员会提前告知可能存在的风险, 机主在自行考虑后决定是否交由维修人员进行维修.
          若因静电等不可抗力因素导致维修物品损坏或数据丢失等情况, 本中心概不承担任何赔偿责任. 请确定前往维修的师生们,
          已充分了解并同意此免责声明, 感谢您的理解与支持!
        </p>
        <div class="flex items-center gap-x-2">
          <Icon name="lucide:clock" class="flex-none scale-110 text-base-content/40" />
          <p class="text-sm text-base-content">
            工作日 19:00 - 20:00
          </p>
        </div>
        <div class="flex items-center gap-x-2">
          <Icon name="lucide:map-pin" class="flex-none scale-110 text-base-content/40" />
          <p class="text-sm text-base-content">
            学生宿舍一栋三楼西南侧
          </p>
        </div>
      </div>
      <div class="h-0.5 min-w-fit my-8 bg-base-200 lg:w-0.5 lg:h-auto lg:my-0" />
      <div class="max-w-lg space-y-2 mx-4">
        <div class="flex items-center gap-x-2 w-full">
          <AppInput v-model="formData.name" label="姓名" alt-label="你的真实姓名" />
          <AppInput v-model="formData.uid" label="学号" alt-label="你的11位学号" />
        </div>
        <AppInput v-model="formData.phone" label="电话" alt-label="用于特殊情况通知" />
        <div class="flex items-center gap-x-2 w-full">
          <AppInput v-model="formData.class" label="班级" alt-label="例: 22计算机教育B班" />
        </div>
        <div class="w-full">
          <div>
            <span class="text-sm text-base-content/80"> 预约日期 </span>
          </div>
          <DatePicker v-model="formData.appTime" class="w-full" />
        </div>
        <label class="w-full">
          <div>
            <span class="text-sm text-base-content/80"> 详细问题 </span>
          </div>
          <textarea
            v-model="formData.problem"
            class="h-25 w-full rounded-md border border-base-content/15 bg-base-100 px-3 py-2 text-sm text-base-content outline-none transition-colors focus:border-primary"
          />
          <div>
            <span class="text-xs text-base-content/50"> 尽可能详细地说明问题以及前因后果,最好备注上电脑型号 </span>
          </div>
        </label>
        <div class="flex items-end justify-between">
          <div class="flex flex-col space-y-4">
            <label class="flex cursor-pointer items-center">
              <AppCheckbox v-model="hasChecked.userAgreement" class="mr-2">
                <Icon name="lucide:check" class="size-3" />
              </AppCheckbox>
              <div class="my-auto font-medium text-base-content text-sm lg:hidden flex">我已阅读并同意上侧条款</div>
              <div class="my-auto font-medium text-base-content text-sm hidden lg:flex">我已阅读并同意左侧条款</div>
            </label>
            <label v-show="hasChecked.userAgreement" class="flex cursor-pointer items-center">
              <AppCheckbox v-model="hasChecked.triedMyself" class="mr-2">
                <Icon name="lucide:check" class="size-3" />
              </AppCheckbox>
              <div class="my-auto font-medium text-base-content text-sm">我已尝试搜索问题并自己解决</div>
            </label>
            <label v-show="hasChecked.triedMyself" class="flex cursor-pointer items-center">
              <AppCheckbox v-model="hasChecked.describedInDetail" class="mr-2">
                <Icon name="lucide:check" class="size-3" />
              </AppCheckbox>
              <div class="my-auto font-medium text-base-content text-sm">我已尽可能详细地描述问题</div>
            </label>
            <label v-show="hasChecked.describedInDetail" class="flex cursor-pointer items-center">
              <AppCheckbox v-model="hasChecked.comeEarly" class="mr-2">
                <Icon name="lucide:check" class="size-3" />
              </AppCheckbox>
              <div class="my-auto font-medium text-base-content text-sm">我会尽量早来不让工作人员加班</div>
            </label>
          </div>
          <AppButton v-show="!hasChecked.comeEarly" disabled>
            提交预约
          </AppButton>
          <AppButton v-show="hasChecked.comeEarly" color="primary" :disabled="loading" @click="submit()">
            {{ loading ? '提交中...' : '提交预约' }}
          </AppButton>
        </div>
        <div>
          <div v-if="alertInfo.info" class="mt-4 rounded-md bg-success/15 px-3 py-2 text-sm text-success" role="alert">
            {{ alertInfo.info }}
          </div>
          <div v-if="alertInfo.error" class="mt-4 rounded-md bg-error/15 px-3 py-2 text-sm text-error" role="alert">
            {{ alertInfo.error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
