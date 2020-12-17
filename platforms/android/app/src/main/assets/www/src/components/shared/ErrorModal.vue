<template>
    <div
      class="modal fade error_modal"
      id="errorsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true">
        <div class="vertical-alignment-helper">
            <div class="modal-dialog vertical-align-center">
              <div class="modal-content no-padding">
                <div
                  class="error_modal__image_container"
                  :class="{'error' : !getInvitationValidate()}">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/karrottsportlife/btn_close.svg"
                    alt=""
                    class="error_modal__image_container--close"
                    @click="closeModal()">
                  <!-- <img
                    src="https://s3-us-west-2.amazonaws.com/fuserewards/modal_header.svg"
                    alt=""> -->
                  <img
                    src="./src/assets/images/modal_header.svg"
                    alt=""
                    v-if="getInvitationValidate()">
                  <img
                    src="./src/assets/images/nopermitido.svg"
                    alt=""
                    style="width: 100%;"
                    v-else>
                </div>
                <div class="modal-body error_modal__body">
                  <h4 class="modal-title error_modal__title" id="myModalLabel">

                  </h4>
                  <p class="error_modal__text">

                  </p>
                </div>
                <div class="modal-footer error_modal__footer">
                  <button
                    type="button"
                    class="error_modal__button col-xs-6 modal_close"
                    data-dismiss="modal"
                    @click="hideImage()">
                      Cancelar
                  </button>
                  <a
                    type="button"
                    class="gold-button error_modal__button col-xs-6 active"
                    @click="checkLoginModal()"></a>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          login_image: false
        }
      },
      methods:{
        hideImage(){
          $('#errorsModal').find('.error_modal__image').hide()
          console.log($("#errorsModal").find(".modal-body p").text());
          if ($("#errorsModal").find(".modal-title").text()=="Un momento..." &&
              $("#errorsModal").find(".modal-body p").text()=="Tienes una sesión abierta en otro dispositivo."){
            this.deleteSession('log_in', true);
            // this.$router.push({name: 'log_in'})
          }
        },
        closeModal(){
          if ($("#errorsModal").find(".modal-title").text()=="Un momento..." &&
              $("#errorsModal").find(".modal-body p").text()=="Tienes una sesión abierta en otro dispositivo."){
            this.deleteSession('log_in', true);
            // this.$router.push({name: 'log_in'})
          }
          $('#errorsModal').modal('toggle')
        },
        checkLoginModal(){
          this.hideImage()
          if($(event.target).text() == 'Ingresa Aquí'){
            $('#errorsModal').modal('toggle')
            this.$router.push({name: 'log_in'})
          }else if($(event.target).text() == 'Regresar'){
            window.history.back()
            $('#errorsModal').modal('toggle')
          }else{
            $('#errorsModal').modal('toggle')
          }
        }
      },
      mounted(){
        if($('.error_modal__button').text() == 'Ingresa Aquí'){
          this.login_image = true
        }
      }
    }
</script>

<style scoped>
    .modal {
    }
    .vertical-alignment-helper {
        display:table;
        height: 100%;
        width: 100%;
        padding: 15px;
    }
    .vertical-align-center {
        /* To center vertically */
        display: table-cell;
        vertical-align: middle;
    }
    .modal-content {
        /* Bootstrap sets the size of the modal in the modal-dialog class, we need to inherit it */
        width:inherit;
        height:inherit;
        /* To center horizontally */
        margin: 0 auto;
        border-radius: 2px;
        padding: 10px;
        position: relative;
    }

    .modal-content{
        border-radius: 0px;
    }

    .modal-footer {
        padding: 0px;
        border-top: none;
    }

</style>
