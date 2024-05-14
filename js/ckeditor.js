var editElements = {};

var editor1 = CKEDITOR.replace('content', {
  extraPlugins: 'divarea',
  height: 'max-content'
});
var editor2 = CKEDITOR.replace('subside', {
 extraPlugins: 'divarea',
  height: 'max-content'
});
var editor3 = CKEDITOR.replace('footer', {
 extraPlugins: 'divarea'
});

editor1.on('change', handleEditorChange);
editor1.on('blur', handleEditorBlur);
editor2.on('change', handleEditorChange);
editor2.on('blur', handleEditorBlur);
editor3.on('change', handleEditorChange);
editor3.on('blur', handleEditorBlur);

function handleEditorChange(evt) {
  var editorId = evt.editor.name;
  editElements[editorId] = true;

}

function handleEditorBlur(evt) {
  var editor = evt.editor;
  var editorId = editor.name;
  var elementId = editor.element.getId();
  var element = $('#' + elementId);
  var value = editor.getData();
  saveData(element, value, editorId);
  // editor.destroy()
  
}

function saveData(element, value, editorId) {
  if (editElements[editorId] !== undefined) {
    var confirmSave = confirm('Save new changes?');
    if (!confirmSave) {
      alert("Changes are not saved, you can continue to edit or refresh the page.");
      return;
    }

    var content = value;
    var target = element.data('target') || 'pages';
    editElements[editorId] = undefined;
    $.post("", {
      fieldname: editorId,
      content: content,
      target: target,
      token: token,
    })
    .done(function () {
      $("#save").show().delay(100).fadeOut();
    });
  }
}
