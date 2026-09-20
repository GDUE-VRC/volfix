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

onMounted(() => {
  window.HSStaticMethods.autoInit()
})
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
      <span v-if="issue.closed" class="badge badge-soft badge-success text-xs">已维修</span>
      <span v-if="!issue.closed" class="badge badge-soft badge-warning text-xs">未维修</span>
    </td>
    <td>
      <button class="btn btn-circle btn-text btn-sm" :data-overlay="`#modal-${issue.id}`">
        <span class="icon-[mdi--eye-outline]" />
      </button>
      <button v-show="!issue.closed" class="btn btn-circle btn-text btn-sm" @click="$emit('toggleIssue')">
        <span class="icon-[mdi--check]" />
      </button>
      <button v-show="issue.closed" class="btn btn-circle btn-text btn-sm" @click="$emit('toggleIssue')">
        <span class="icon-[mdi--close]" />
      </button>
      <!-- <button @click="$emit('deleteIssue')" class="btn btn-circle btn-text btn-sm"><span
                    class="icon-[mdi--delete-outline]"></span></button> -->
    </td>
  </tr>

  <!-- Modal structure -->
  <div
    :id="`modal-${issue.id}`"
    class="overlay modal modal-middle overlay-open:opacity-100 hidden"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog overlay-open:opacity-100">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            详细信息
          </h3>
          <button
            type="button"
            class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            :data-overlay="`#modal-${issue.id}`"
          >
            <span class="icon-[tabler--x] size-4" />
          </button>
        </div>
        <div class="modal-body">
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
        <div class="modal-footer">
          <button v-if="!issue.closed" type="button" class="btn btn-soft btn-secondary" @click="$emit('toggleIssue')">
            标记为已维修
          </button>
          <button v-if="issue.closed" type="button" class="btn btn-soft btn-secondary" @click="$emit('toggleIssue')">
            标记为未维修
          </button>
          <button
            type="button"
            aria-label="Close"
            :data-overlay="`#modal-${issue.id}`"
            class="btn btn-soft btn-error"
            @click="$emit('deleteIssue')"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
