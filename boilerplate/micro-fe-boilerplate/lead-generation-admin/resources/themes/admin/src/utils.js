// Utils for app
export const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });
// For list add forms filed
export function baseEditInput(defaultValue = '') {
  return [
    {
      type: 'text',
      placeholder: '',
      value: defaultValue,
      tooltip: true,
      editType: 'label',
    },
    {
      type: 'text',
      placeholder: '',
      tooltip: true,
      editType: 'placehoder',
    },
  ];
}

export function getSiteIDFromUrl() {
  const search = window.location.href.split('?')[1];
  return new URLSearchParams(String(search)).get('siteID') || 1;
}

export function getDefaultThankYouTitle() {
  const mapTitleBySiteID = {
    1: 'CÁM ƠN BẠN',
  };
  const siteID = getSiteIDFromUrl();
  return mapTitleBySiteID[siteID] || 'THANK YOU';
}

export function getDefaultThankYouSubtitle() {
  const mapSubTitleBySiteID = {
    1: 'Chúng tôi chân thành cám ơn bạn đã bớt chút thời gian để điền thông tin!',
  };
  const siteID = getSiteIDFromUrl();
  return mapSubTitleBySiteID[siteID] || 'We appreciate your time!';
}

export const IS_DEV = process.env.NODE_ENV === 'development';

export function getElementOuterHeight(element, outer = true) {
  if (!element || !window) {
    return 0;
  }
  let height = element.clientHeight;
  const style = window.getComputedStyle(element);
  if (style?.marginTop && outer) {
    height += parseFloat(style.marginTop);
  }
  if (style?.marginBottom && outer) {
    height += parseFloat(style.marginBottom);
  }
  return height;
}

var MIN_SCROLL = 200;
export function getTableScroll(tableEl) {
  try {
    const heightWrap = tableEl.clientHeight;

    const heightTableHeader = getElementOuterHeight(tableEl.querySelector('.ant-table-thead') || undefined) || 0;
    const heightTablePaging = getElementOuterHeight(tableEl.querySelector('.ant-table-pagination') || undefined) || 0;
    const heightTableHeaderTitle = getElementOuterHeight(tableEl.querySelector('.ant-table-title') || undefined) || 0;
    const heightTableHeaderFooter = getElementOuterHeight(tableEl.querySelector('.ant-table-footer') || undefined) || 0;

    const newVal = Math.floor(heightWrap - heightTableHeader - heightTablePaging - heightTableHeaderTitle - heightTableHeaderFooter - 2);

    return { y: newVal };
  } catch (err) {
    return { y: MIN_SCROLL };
  }
}

export function formatNumberToCurrency(numProps, sep = ',') {
  // remove sign if negative
  let sign = 1;
  if (numProps < 0) {
    sign = -1;
    numProps = -numProps;
  }
  // trim the number decimal point if it exists
  const num = numProps.toString().includes('.') ? numProps.toString().split('.')[0] : numProps.toString();
  const len = num.toString().length;
  let result = '';
  let count = 1;

  for (let i = len - 1; i >= 0; i--) {
    result = num.toString()[i] + result;
    if (count % 3 === 0 && count !== 0 && i !== 0) {
      result = sep + result;
    }
    count++;
  }

  // add number after decimal point
  if (numProps.toString().includes('.')) {
    const decimalSep = sep !== ',' ? ',' : '.';
    result = result + decimalSep + numProps.toString().split('.')[1];
  }
  // return result with - sign if negative
  return sign < 0 ? '-' + result : result;
}
const ROUND_STRING = {
  K: 1000,
  M: 1000000,
  B: 1000000000,
  T: 1000000000000,
};
export function formatNumberString(numProps, number = ROUND_STRING.M) {
  if (numProps < number) {
    return formatNumberToCurrency(numProps, ',');
  }

  let string = '';
  Object.keys(ROUND_STRING).forEach((k, idx) => {
    const roundString = k;
    if (ROUND_STRING[roundString] <= numProps) {
      string = roundString;
    }
  });

  const num = Math.floor((numProps / ROUND_STRING[string]) * 100) / 100;

  return num + string;
}
