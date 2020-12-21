<template>
  <article class="support">
    <section class="coupon__nav" style="padding: 30px 28px 0;">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
    </section>
    <p class="notifications__title">Soporte</p>
    <section
      class="support__content">
      <p
        class="support__content--principal_section">Preguntas frecuentes</p>
      <div
        class="support__content--section"
        v-for="(question, index) in questions"
        :class="{'active' : current_question == index}">
        <p
          class="support__content--title"
          :class="{'active' : current_question == index}"
          v-html="question.title"
          @click="selectItem(index)"></p>
        <transition
          name="fade">
          <div
            class="support__content--text"
            v-show="current_question == index">
            <p v-html="question.text"></p>
          </div>
        </transition>
      </div>
    </section>
    <section class="support__other">
      <p class="support__other--text">¿No resolvimos tus dudas?</p>
      <div class="support__other--button" @click="openContactChat()">
        <p>Comunícate con un asesor</p>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  methods:{
    selectItem(index){
      this.current_question == index ? this.current_question = null : this.current_question = index
    },
    openContactChat(){
      window.open("whatsapp://send?phone=573232431010&text=Tengo dudas con el servicio de Tweni", '_system');
    }
  },
  data(){
    return{
      current_question: null,
      questions:[
        {
          title: "Pregunta frecuente #1",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #2",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #3",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #4",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #5",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #6",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        },
        {
          title: "Pregunta frecuente #7",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,"+
                " sed diam nonummy nibh euismod tincidunt ut laoreet dolore"+
                " magna aliquam erat volutpat. Ut wisi enim ad minim veniam,"+
                " quis nostrud exerci tation ullamcorper suscipit lobortis nisl"+
                " ut aliquip ex ea commodo consequat."
        }
      ]
    }
  }
}
</script>
