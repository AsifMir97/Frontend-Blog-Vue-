<template>
    <div class="comment-container">
        <div class="comment-body">
            <form @submit.prevent="updateComment">
                <textarea v-model="updatedComment"></textarea>
                <button type="submit">Save</button>
            </form>
            {{ comment_text }}
        </div>
        <div class="comment-footer">
            {{ author }}  {{ date_published }}
            <button @click="openEditForm">Edit</button>
        </div>
    </div>
</template>

<script>
import { commentsService } from '../services/commentsService';
export default {
    data() {
        return {
            updatedComment: ''
        }
    },
    methods: {
        updateComment() {
            commentsService.editComment(this.updatedComment, this.articleId, this.commentId)
                .then(response => {
                    // do something with the successful response
                })
                .catch(error => {
                    // handle error
                })
        },
        openEditForm() {
            // toggle a variable to show/hide the form
        }
    }
}
</script>
