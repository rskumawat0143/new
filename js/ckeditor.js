
var editElements = {};
var editorDiv = document.createElement("div");
$(editorDiv).addClass("ckeditor").attr("id",'editors');
  $(editorDiv).appendTo('.editable');
  let editors = document.querySelector('.ckeditor')
let editor = CKEDITOR.replace( editors, {
extraPlugins: 'divarea'
} );


editors.on('change',function(){
  editElements[$(this).attr('id')] = editor.getData();
  // console.log(editElements)
})

editors.on('blur',function(){
  saveData(editors)
});


function saveData(editor) {
  if (editElements[editor.attr('id')]!=undefined) {
      // Confirmation popup for saving changes (set in the database)
      if (typeof saveChangesPopup !== 'undefined' && saveChangesPopup && !confirm('Save new changes?')) {
          alert("Changed are not saved, you can continue to edit or refresh the page.");
          return
      }

      var id = editor.attr('id');
      var content = editElements[editor.attr('id')];
      var target = (editor.attr('data-target')!=undefined) ? editor.attr('data-target'):'pages';
      editElements[editor.attr('id')] = undefined;
      $.post("",{
          fieldname: id,
          content: content,
          target: target,
          token: token,
      })
        .done(function() {
            $("#save").show();
            $('#save').delay(100).fadeOut();
        });
  }
}
// });
