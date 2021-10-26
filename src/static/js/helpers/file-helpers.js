export function downloadFile(name, format, data) {
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(new Blob([data]));
  link.setAttribute('download', format ? `${name}.${format}` : name);
  document.body.appendChild(link);
  link.click();
}
