jQuery(document).ready(function(){
    jQuery('h4.faq-question').click(function(e){
        this.classList.toggle('faq-active');

        var panel = this.nextSibling.nextSibling;

        if( panel.style.maxHeight !== '12em' ){

            jQuery(this).parent().find('.faq-panel').css({'max-height':'0','min-height':'0'});

            panel.style.maxHeight = '12em';
            panel.style.minHeight = '12em';

        } else {
            panel.style.maxHeight = '0';
            panel.style.minHeight = '0';
        }

    });
});