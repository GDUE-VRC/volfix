<script setup>
const passwd = ref('')
const issueList = ref([])
const errorMessage = ref('')

function formatIssue(issue) {
  issue.appTime = new Date(Number(issue.appTime) + 8 * 60 * 60000).toISOString()
  issue.regTime = new Date(Number(issue.regTime) + 8 * 60 * 60000).toISOString().replace('T', ' ')
  issue.closedTime = new Date(Number(issue.closedTime) + 8 * 60 * 60000).toISOString().replace('T', ' ')
  return issue
}

async function getIssueList() {
  errorMessage.value = ''
  try {
    const issues = await $fetch('/api/issue_list', { query: { passwd: passwd.value } })
    issueList.value = issues.map(formatIssue)
  }
  catch (error) {
    issueList.value = []
    errorMessage.value = error.data?.message ?? '获取列表失败, 请稍后重试'
  }
}

async function runAction(action) {
  errorMessage.value = ''
  try {
    await action()
    await getIssueList()
  }
  catch (error) {
    errorMessage.value = error.data?.message ?? '操作失败, 请稍后重试'
  }
}

function toggleIssue(issueId) {
  return runAction(() => $fetch('/api/toggle_issue', { query: { passwd: passwd.value, id: issueId } }))
}

function deleteIssue(issueId) {
  return runAction(() => $fetch('/api/delet_issue', { query: { passwd: passwd.value, id: issueId } }))
}
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div v-if="errorMessage" class="alert alert-error m-4" role="alert">
      {{ errorMessage }}
    </div>
    <div v-show="!issueList.length" class="flex justify-center items-center">
      <div class="join max-w-sm">
        <input v-model="passwd" type="password" class="input join-item" placeholder="PassWord">
        <button class="btn btn-outline btn-secondary join-item" @click="getIssueList()">
          LOGIN
        </button>
      </div>
    </div>
    <div v-show="issueList.length" class="flex justify-center items-center">
      <table class="table table-sm sm:table">
        <thead>
          <tr>
            <th>姓名</th>
            <th class="hidden md:table-cell">
              班级
            </th>
            <th class="hidden xl:table-cell">
              学号
            </th>
            <th class="hidden lg:table-cell">
              电话
            </th>
            <th>日期</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <TableItem
            v-for="issue in issueList"
            :key="issue.id"
            :issue="issue"
            @toggle-issue="toggleIssue(issue.id)"
            @delete-issue="deleteIssue(issue.id)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>
