module.exports = {
    format_date: (date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    },
    format_time: (date) => {
      const d = new Date(date);
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    },
    truncate_text: (text, length) => {
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
    is_equal: (a, b) => {
      return a === b;
    },
  };
  