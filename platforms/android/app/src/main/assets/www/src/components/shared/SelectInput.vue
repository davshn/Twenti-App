<template>
    <div :class="class_name">
        <input type="text"
            class="col-xs-11 no-padding"
            v-model="selected_input"
            @change="change_info($event.target)"
            :id="counter+'_input'">
        <div class="arrow-down" @click="click_select();">
        </div>
        <select v-model="selected">
            <option v-for="option in options"
                :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                selected: '',
                selected_input: ''
            }
        },
        methods: {
            change_info(event){
                document.getElementById(this.counter+"_input").value = this.selected_input;
                this.$emit('change_input', [ event, this.counter ])
            },
            click_select(){
                $(this.$el).children("select").click();
            }
        },
        watch: {
            selected() {
                this.selected_input = this.selected;
                this.change_info( document.getElementById(this.counter+"_input") );
            }
        },
        props: {
            'options': {
                required: true,
                type: Array
            },
            'class_name': {
                required: true,
                type: String
            },
            'counter': {
                default: -1,
                type: Number
            }
        },
        mounted(){
            this.selected_input = this.options[0];
        }
    }
</script>

<style scoped>

    input{
        border: none;
        background: transparent;
        outline: none;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 13px;
        line-height: 24px;
        color: #212121;
    }

    select{
        opacity: 0;
        border: none;
        background: transparent;
        outline: none;
        position: absolute;
        right: 0px;
        top: 7px;
        width: 18px;
    }

    .arrow-down {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 10px solid #000;
        margin-top: 10px;
        position: absolute;
        right: 5px
    }
</style>
