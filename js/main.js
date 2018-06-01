/**
 *
 * @author Igor Khokhriakov <igor.khokhriakov@hzg.de>
 * @since 6/1/18
 */
webix.ready(function(){
    webix.ui(ui);

    $$('frm').bind($$('data'));
    $$('frm').elements['submit'].attachEvent('onClick', function () {
         alert("!!!")
    })
});