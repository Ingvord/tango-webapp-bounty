/**
 *
 * @author Igor Khokhriakov <igor.khokhriakov@hzg.de>
 * @since 6/1/18
 */
webix.ready(function(){
    webix.ui(ui);

    //$$('frm').bind($$('data'));
    $$('data').attachEvent("onKeyPress", function(code, e) {
        if (code === 86 /*v*/ && e.ctrlKey && e.shiftKey && !e.altKey) {
            this.showColumn('votes');
            return false;
        }
        if (code === 73 /*i*/ && e.ctrlKey && e.shiftKey && !e.altKey) {
            this.showColumn('id');
            return false;
        }
    });
});