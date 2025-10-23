import { v4 as uuidv4 } from 'uuid';

export const getWindowOrigin = () => {
  if (window.location.origin.includes('localhost')) {
    return 'https://dev.leadgen.hellobacsi.com'
  }
  return window.location.origin
}

export const convertDataForm = (campaign) => {
  const extra = campaign.extra_fields;
  const forms = campaign.forms;

  let listFormMapping = forms.map((i) => {
    let dataAdd = {
      name: _.capitalize(i.control == "tel" ? "phone" : i.control) + 'Block',
      id: uuidv4(),
      data: {
        value: i.options[0].value,
        placeholder: i.options[1].value,
      },
    };
    return dataAdd;
  });

  return listFormMapping;
};

export const convertDataTextBlocks = (campaign) => {
  const extra = campaign.extra_fields;
  let textBlocks = {
    titleBlock: {
      data: {
        value: extra.title,
      },
    },
    subtitleBlock: {
      data: {
        value: extra.desc,
      },
    },
  };
  return textBlocks;
};

export const convertImageBlocks = (campaign) => {
  const extra = campaign.extra_fields;
  let imageBlocks = {};
  if (extra.imageBlocks) {
    imageBlocks = JSON.parse(extra.imageBlocks);
  }
  let data = {
    imageMobile: {
      data: {
        value: campaign.image || '',
        url: '',
        newtab: true,
      },
    },
    imageDesktop: {
      data: {
        value: campaign.image_desktop || '',
        url: '',
        newtab: true,
      },
    },
    imageBackground: {
      data: {
        value: campaign.image_background || '',
      }
    },
    imageOverlayMobile: {
      data: {
        value: campaign.image_overlay_mobile || '',
      }
    },
    imageOverlayDesktop: {
      data: {
        value: campaign.image_overlay_desktop || '',
      }
    },
    imageThankYou: {
      data: {
        value: campaign.thank_you_image || `${ getWindowOrigin() }/admin/img/thankyou_v2.png`,
      },
    },
  };
  const mergeData = _.merge(data, imageBlocks);
  return mergeData;
};

export const convertActionBlock = (campaign) => {
  const extra = campaign.extra_fields;
  let data = {
    submitBlock: {
      data: {
        value: extra.submit,
        // text: extra.popUpTermAgreeText,
        // text2: extra.popUpTermText,
        // url: extra.popUpTermURL,
      },
    },
    linkButtonBlock: {
      data: {},
    },
  };
  return data;
};

export const convertDataThankYou = (campaign) => {
  const extra = campaign.extra_fields;
  let data = [
    {
      name: 'TitleBlock',
      id: uuidv4(),
      data: {
        value: extra.popupThankyouTitle,
        align: 'center',
      },
    },
    {
      name: 'SubtitleBlock',
      id: uuidv4(),
      data: {
        value: extra.popupThankyouDesc,
        align: 'center',
      },
    },
  ];
  return data;
};

export const mappingFormAddedData = (listAdded) => {
  let data = [];
  if (listAdded && listAdded.length) {
    data = listAdded.map((i) => ({
      control: i.name,
      name: i.name,
    }));
  } else {
    data.push({
      control: 'Other',
      name: 'Other',
    });
  }

  return data;
};

export const removeImageValueBase64ForPost = (imageBlocks) => {
  const newImage = _.cloneDeep(imageBlocks);
  delete newImage.imageMobile.data.value;
  delete newImage.imageDesktop.data.value;
  delete newImage.imageThankYou.data.value;
  delete newImage.imageBackground.data.value;
  delete newImage.imageOverlayMobile.data.value;
  delete newImage.imageOverlayDesktop.data.value;
  return newImage;
};
