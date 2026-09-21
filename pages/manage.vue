<script setup>
definePageMeta({ middleware: 'auth' })

const issueList = ref([])
const errorMessage = ref('')

const { clear } = useUserSession()

function formatIssue(issue) {
  issue.appTime = new Date(Number(issue.appTime) + 8 * 60 * 60000).toISOString()
  issue.regTime = new Date(Number(issue.regTime) + 8 * 60 * 60000).toISOString().replace('T', ' ')
  issue.closedTime = new Date(Number(issue.closedTime) + 8 * 60 * 60000).toISOString().replace('T', ' ')
  return issue
}

async function getIssueList() {
  errorMessage.value = ''
  try {
    const issues = await $fetch('/api/issues')
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

function toggleIssue(issue) {
  return runAction(() => $fetch(`/api/issues/${issue.id}`, {
    method: 'PATCH',
    body: { closed: !issue.closed },
  }))
}

function deleteIssue(issueId) {
  return runAction(() => $fetch(`/api/issues/${issueId}`, { method: 'DELETE' }))
}

async function logout() {
  await clear()
  await navigateTo('/login')
}

onMounted(getIssueList)
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div v-if="errorMessage" class="m-4 rounded-md bg-error/15 px-3 py-2 text-sm text-error" role="alert">
      {{ errorMessage }}
    </div>
    <AppButton variant="ghost" class="self-end mr-4" @click="logout()">
      登出
    </AppButton>
    <table class="w-full border-collapse text-base-content [&_td]:p-2 [&_th]:p-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-base-content/70 [&_tr]:border-b [&_tr]:border-base-content/15">
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
          @toggle-issue="toggleIssue(issue)"
          @delete-issue="deleteIssue(issue.id)"
        />
      </tbody>
    </table>
  </div>
</template>
