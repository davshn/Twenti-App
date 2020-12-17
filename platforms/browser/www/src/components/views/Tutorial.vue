<template>
    <div class="col-xs-12 no-padding" id="fullpage">
        <div class="section">
            <div class="slide">
                <div class="total-center col-xs-12 no-padding">
                    <div class="circle center-block">
                        <img src="./src/assets/images/icons/Tutorial/rank.svg"
                            class="center-block">
                    </div>
                    <h2 class="col-xs-10 col-xs-offset-1">
                        Welcome application
                    </h2>
                    <p class="col-xs-10 col-xs-offset-1">
                        If you are a culinary fan, if you like to spend time in your kitchen, you likely find yourself looking for reliable resources through which
                    </p>
                </div>
            </div>
            <div class="slide">
                <div class="total-center col-xs-12 no-padding">
                    <div class="circle center-block">
                        <img src="./src/assets/images/icons/Tutorial/Group 2.svg"
                            class="center-block">
                    </div>
                    <h2 class="col-xs-10 col-xs-offset-1">
                        Helen Keller A Teller
                    </h2>
                    <p class="col-xs-10 col-xs-offset-1">
                        The Myspace page defines the individual, his or her characteristics, traits, personal choices and the overall personality of the person.
                    </p>
                </div>
            </div>
            <div class="slide">
                <router-link tag="a"
                    class="gold-text skip-button pull-right"
                    :to="{ name: 'offers_index' }">
                    {{ $t("common.skip") || upperCase }}
                </router-link>
                <div class="total-center col-xs-12 no-padding">
                    <div class="circle center-block">
                        <img src="./src/assets/images/icons/Tutorial/chef.svg"
                            class="center-block">
                    </div>
                    <h2 class="col-xs-10 col-xs-offset-1">
                        Dream Interpretation
                    </h2>
                    <p class="col-xs-10 col-xs-offset-1">
                        The state of Utah in the United States is home to lots of beautiful National Parks, & Bryce Canyon
                    </p>
                    <div class="col-xs-12">
                        <router-link tag="a"
                            class="col-xs-12 gold-button"
                            :to="{ name: 'log_in' }">
                            {{ $t("common.sign_in") | capitalize }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            if (typeof $.fn.fullpage.destroy == 'function') {
                $.fn.fullpage.destroy('all');
            }
            $(this.$el).fullpage({
                controlArrows: false,
                slidesNavigation: true
            });
        },
        //Added from walmart
        destroyed(){
            if (typeof $.fn.fullpage.destroy == 'function') {
                $.fn.fullpage.destroy('all');
            }
        }
    }
</script>

<style scoped>
    .circle{
        background-color: #f3f0e9;
        border-radius: 50%;
        width: 149px;
        height: 149px;
        position: relative;
    }

    .slide{
        position: relative;
    }

    .circle img{
        top: 50%;
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
    }

    .total-center{
        top: 50%;
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
    }

    #fullpage h2{
        margin-top: 64px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 19px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
        color: #212121;
    }

    #fullpage p{
        margin-top: 16px;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 13px;
        text-align: center;
        line-height: 24px;
        color: #616161;
    }

    .skip-button{
        position: absolute;
        top: 10px;
        right: 10px;
        text-transform: uppercase;
    }
</style>

<style>
    #fp-nav ul li a span, .fp-slidesNav ul li a span{
        background: #5B96FC;
        height: 6px;
        width: 6px;
        opacity: 0.24;
    }

    #fp-nav ul li a.active span, #fp-nav ul li:hover a.active span, .fp-slidesNav ul li a.active span, .fp-slidesNav ul li:hover a.active span{
        height: 6px;
        width: 6px;
        margin:-2px 0 0 -2px;
        border-radius: 50%;
        opacity: 1;
    }
</style>
