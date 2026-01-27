const path = require('path')
const fs = require('fs/promises')
const svgr = require('@svgr/core').transform

const prefix = `// @ts-nocheck\n// 🔴 DO NOT EDIT — This file is generated.\n`
const svgPath = path.join(__dirname, '../public/svgs/react')
const componentsAtomsPath = path.join(__dirname, '../src/components')
const componentsAtomsIconsPath = `${componentsAtomsPath}/Icons`
const exportAtomsIconsPath = `${componentsAtomsIconsPath}/index.ts`
const componentTemplate = `${prefix}{componentContent}`
const componentImportTemplate = `import {componentName} from './{componentName}'\n`

async function exists(file) {
  try {
    await fs.stat(file)
    return true
  } catch (err) {
    console.log('** icons.cjs : ', err)
    return false
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function generateComponentName(svgFile) {
  return svgFile
    .replace('_', '-')
    .split('-')
    .map(capitalizeFirstLetter)
    .join('')
    .replace('.svg', '')
}

async function generateIconTemplate(content, componentName) {
  const iconSvgTransform = await svgr(
    content,
    {
      icon: true,
      typescript: true,
      plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
    },
    { componentName },
  )

  return componentTemplate.replaceAll('{componentContent}', iconSvgTransform)
}

async function loadIconsPath() {
  const isIconsPath = await exists(componentsAtomsIconsPath)
  if (!isIconsPath) {
    await fs.mkdir(componentsAtomsIconsPath)
  }

  const compArr = []

  const files = (await fs.readdir(svgPath)).filter((name) => /svg$/.test(name))
  for (const file of files) {
    const componentName = `${generateComponentName(file)}Svg`
    const componentFile = `${componentsAtomsIconsPath}/${componentName}.tsx`

    const contentFile = await fs.readFile(`${svgPath}/${file}`)
    const componentContent = await generateIconTemplate(
      contentFile,
      componentName,
    )

    compArr.push(componentName)
    await fs.writeFile(componentFile, componentContent)
  }

  let indexContent = `${prefix}`
  compArr.forEach((compName) => {
    indexContent += componentImportTemplate.replaceAll(
      `{componentName}`,
      compName,
    )
  })
  indexContent += '\n'
  indexContent += `export {${compArr.join(',\n')}}`
  await fs.writeFile(exportAtomsIconsPath, indexContent)
}

loadIconsPath()
