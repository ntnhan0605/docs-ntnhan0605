import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // this assumes that all your source files are in a top-level src/ directory - you might need to adjust this to your file structure
  generates: {
    './src/__generated__/hbase/': {
      schema: [
        {
          'https://api-hbase-staging.uts.network/graphql/v1': {
            headers: {
              'x-graphql-api-key':
                '+uH+1nNJRgpUFNCeHUHeYvN1MN2tmj1a5YHVy67UyqtTj3PabPAaysNdCL8CEPTv',
            },
          },
        },
      ],
      documents: ['src/**/*.hbase_endpoint.{ts,tsx}'],
      config: {
        withHooks: true,
      },
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './src/__generated__/main/': {
      schema: [
        {
          'https://api-staging.uts.network/graphql/v1': {
            headers: {
              'x-graphql-api-key':
                '+uH+1nNJRgpUFNCeHUHeYvN1MN2tmj1a5YHVy67UyqtTj3PabPAaysNdCL8CEPTv',
            },
          },
        },
      ],
      documents: ['src/**/*.main_endpoint.{ts,tsx}'],
      config: {
        withHooks: true,
      },
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};
