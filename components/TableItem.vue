<script setup lang="ts">
import type { Issue } from '~/shared/db/schema'

defineProps<{ issue: Issue }>()

defineEmits<{ toggleIssue: [], deleteIssue: [] }>()
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
        {{ formatMonthDay(issue.appTime) }}
      </div>
      <div class="text-xs inline">
        {{ `/${formatWeekday(issue.appTime)}` }}
      </div>
    </td>
    <td>
      <span v-if="issue.closed" class="rounded-full bg-success/20 px-2 py-0.5 text-xs text-success">已维修</span>
      <span v-else class="rounded-full bg-warning/20 px-2 py-0.5 text-xs text-warning">未维修</span>
    </td>
    <td>
      <AppDialog title="详细信息">
        <template #trigger>
          <button
            class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
            aria-label="查看详情"
          >
            <Icon name="lucide:eye" class="size-4" />
          </button>
        </template>

        <DialogClose as-child>
          <button
            class="absolute end-3 top-3 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
            aria-label="关闭"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </DialogClose>

        <div class="space-y-1">
          <p><strong>姓名:</strong> {{ issue.name }}</p>
          <p><strong>班级:</strong> {{ issue.class }}</p>
          <p><strong>学号:</strong> {{ issue.uid }}</p>
          <p><strong>电话:</strong> {{ issue.phone }}</p>
          <p>
            <strong>预约时间:</strong>
            {{ formatDate(issue.appTime) }}
          </p>
          <p>
            <strong>提交时间:</strong>
            {{ formatDateTime(issue.regTime) }}
          </p>
          <p v-if="issue.closed">
            <strong>完成时间:</strong>
            {{ formatDateTime(issue.closedTime) }}
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
        <Icon name="lucide:check" class="size-4" />
      </button>
      <button
        v-show="issue.closed"
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
        aria-label="标记为未维修"
        @click="$emit('toggleIssue')"
      >
        <Icon name="lucide:x" class="size-4" />
      </button>
    </td>
  </tr>
</template>
