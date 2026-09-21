<script setup>
defineProps({
  issue: {
    type: Object,
    default: () => ({}),
  },
})
defineEmits(['toggleIssue', 'deleteIssue'])

function getWeekday(dateString) {
  const date = new Date(dateString)
  const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekday[date.getDay()]
}
</script>

<template>
  <tr>
    <td>{{ issue.name }}</td>
    <td class="hidden md:table-cell">
      {{ issue.class.length > 12 ? `${issue.class.slice(0, 8)}...` : issue.class }}
    </td>
    <td class="hidden xl:table-cell">
      {{ issue.uid }}
    </td>
    <td class="hidden lg:table-cell">
      {{ issue.phone }}
    </td>
    <td>
      <div class="inline">
        {{ issue.appTime.slice(5, 10) }}
      </div>
      <div class="text-xs inline">
        {{ `/${getWeekday(issue.appTime)}` }}
      </div>
    </td>
    <td>
      <span v-if="issue.closed" class="rounded-full bg-success/20 px-2 py-0.5 text-xs text-success">已维修</span>
      <span v-if="!issue.closed" class="rounded-full bg-warning/20 px-2 py-0.5 text-xs text-warning">未维修</span>
    </td>
    <td>
      <AppDialog title="详细信息">
        <template #trigger>
          <button
            class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
            aria-label="查看详情"
          >
            <span class="icon-[mdi--eye-outline]" />
          </button>
        </template>

        <DialogClose as-child>
          <AppButton variant="ghost" class="absolute end-3 top-3" aria-label="关闭">
            <span class="icon-[tabler--x]" />
          </AppButton>
        </DialogClose>

        <div class="space-y-1 text-sm">
          <p><strong>姓名:</strong> {{ issue.name }}</p>
          <p><strong>班级:</strong> {{ issue.class }}</p>
          <p><strong>学号:</strong> {{ issue.uid }}</p>
          <p><strong>电话:</strong> {{ issue.phone }}</p>
          <p>
            <strong>预约时间:</strong>
            {{ issue.appTime.slice(0, 10) }}
          </p>
          <p>
            <strong>提交时间:</strong>
            {{ issue.regTime.slice(0, 19) }}
          </p>
          <p v-if="issue.closed">
            <strong>完成时间:</strong>
            {{ issue.closedTime.slice(0, 19) }}
          </p>
          <div>
            <strong>问题详情:</strong>
            <p class="inline text-wrap break-words">
              {{ ` ${issue.problem}` }}
            </p>
          </div>
        </div>

        <template #actions="{ close }">
          <div class="mt-5 flex justify-end gap-2">
            <AppButton variant="ghost" @click="close(); $emit('toggleIssue')">
              {{ issue.closed ? '标记为未维修' : '标记为已维修' }}
            </AppButton>
            <AppButton variant="ghost" color="error" @click="close(); $emit('deleteIssue')">
              删除
            </AppButton>
          </div>
        </template>
      </AppDialog>

      <button
        v-show="!issue.closed"
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
        aria-label="标记为已维修"
        @click="$emit('toggleIssue')"
      >
        <span class="icon-[mdi--check]" />
      </button>
      <button
        v-show="issue.closed"
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
        aria-label="标记为未维修"
        @click="$emit('toggleIssue')"
      >
        <span class="icon-[mdi--close]" />
      </button>
    </td>
  </tr>
</template>
