jQuery(document).ready(function(){
    jQuery('h4.faq-question').click(function(e){

        var panel = this.nextSibling.nextSibling;

        if( panel.style.maxHeight !== '12em' ){

            jQuery(this).parent().find('div.faq-panel').css({'max-height':'0','min-height':'0'});
            jQuery(this).parent().find('h4.faq-question').removeClass('faq-active');

            panel.style.maxHeight = '12em';
            panel.style.minHeight = '12em';

        } else {
            panel.style.maxHeight = '0';
            panel.style.minHeight = '0';
        }

        this.classList.toggle('faq-active');

    });
});