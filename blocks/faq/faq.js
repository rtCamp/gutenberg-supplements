jQuery(document).ready(function(){
    jQuery('h4.faq-question').click(function(e){

        var panel = this.nextSibling.nextSibling;

		if( panel.style.height === '0px' || panel.style.height === '' ){

            jQuery(this).parent().find('div.faq-panel').css({'height':'0','padding':'0 0.6em'});
            jQuery(this).parent().find('h4.faq-question').removeClass('faq-active');


			panel.style.height = panel.scrollHeight + 'px';
			panel.style.padding = '2em 0.6em';

        } else {
            panel.style.height = '0';
			panel.style.padding = '0 0.6em';
        }

        this.classList.toggle('faq-active');

    });
});