import { baseEditInput } from '@/utils';

export const listAddField = [
  {
    control: 'number',
    name: 'number',
    label: 'Number',
    listEdit: [...baseEditInput('number')],
  },
  {
    control: 'email',
    name: 'email',
    label: 'Email',
    listEdit: [...baseEditInput('email')],
  },
  {
    control: 'tel',
    name: 'phone-number',
    label: 'Phone Number',
    listEdit: [...baseEditInput('phone')],
  },
  {
    control: 'text',
    name: 'text',
    label: 'Text',
    listEdit: [...baseEditInput('text')],
  },
  {
    control: 'date',
    name: 'date',
    label: 'Date',
    listEdit: [...baseEditInput('date')],
  },
];

export const findDuplicateKeyField = (listBlockAdded) => {
  const hashBlock = {};
  const listBlockAddedExceptTNC = listBlockAdded.filter(b => b.name !== 'TncBlock')

  for (const block of listBlockAddedExceptTNC) {
    if (block?.data?.value) {
      if (hashBlock[block.data.value]) {
        return block
      } else {
        hashBlock[block.data.value] = block
      }
    }
  }

  return null;
};

export const findTNCWithWrongURLFormat = (listBlockAdded) => {
  try {
    const tncBlocks = listBlockAdded.filter(b => b.name === 'TncBlock')

    for (const block of tncBlocks) {
      const urlsStr = block?.data?.placeholder

      if (!urlsStr) {
        return 'URLs of the T&C block are required. Please provide the information properly'
      }

      const urlsList = urlsStr.split('\n').map(s => s.trim()).filter(Boolean)

      if (!urlsList.length) {
        return 'URLs of the T&C block are required. Please provide the information properly'
      }

      urlsList.map(url => new URL(url))
    }

    return ''
  } catch (err) {
    return 'URLs of the T&C block are invalid. Please try again!'
  }
}