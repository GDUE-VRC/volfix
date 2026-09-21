<script setup>
definePageMeta({ middleware: 'auth' })

const page = ref(1)
const total = ref(0)
const pageSize = ref(20)
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
    const data = await $fetch('/api/issues', { query: { page: page.value } })
    issueList.value = data.items.map(formatIssue)
    total.value = data.total
    pageSize.value = data.pageSize
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

watch(page, getIssueList)
onMounted(getIssueList)
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <div v-if="errorMessage" class="m-4 rounded-md bg-error/15 px-3 py-2 text-sm text-error" role="alert">
      {{ errorMessage }}
    </div>
    <div class="flex justify-center items-center">
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

    <PaginationRoot
      v-model:page="page"
      :total="total"
      :items-per-page="pageSize"
      :sibling-count="1"
      show-edges
      class="mt-4"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex items-center gap-1 [&>*]:inline-flex [&>*]:h-8 [&>*]:min-w-8 [&>*]:cursor-pointer [&>*]:items-center [&>*]:justify-center [&>*]:rounded-md [&>*]:px-2 [&>*]:text-sm [&>*]:hover:bg-base-content/10 [&>*:disabled]:pointer-events-none [&>*:disabled]:opacity-40 [&>[data-type=ellipsis]]:cursor-default [&>[data-type=ellipsis]]:hover:bg-transparent"
      >
        <PaginationPrev>
          <Icon name="lucide:chevron-left" class="size-4" />
        </PaginationPrev>
        <template v-for="(item, index) in items" :key="index">
          <PaginationListItem
            v-if="item.type === 'page'"
            :value="item.value"
            class="data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary data-[selected=true]:hover:bg-primary/25"
          />
          <PaginationEllipsis v-else />
        </template>
        <PaginationNext>
          <Icon name="lucide:chevron-right" class="size-4" />
        </PaginationNext>
      </PaginationList>
    </PaginationRoot>
  </div>
</template>
