/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query Character($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    species\n    gender\n    image\n    origin {\n      name\n    }\n    location {\n      name\n    }\n    episode {\n      id\n    }\n  }\n}": typeof types.CharacterDocument,
    "query Characters($page: Int, $filter: FilterCharacter) {\n  characters(page: $page, filter: $filter) {\n    info {\n      pages\n    }\n    results {\n      id\n      name\n      status\n      species\n      image\n    }\n  }\n}": typeof types.CharactersDocument,
    "query FavoriteCharacters($ids: [ID!]!) {\n  charactersByIds(ids: $ids) {\n    id\n    name\n    status\n    species\n    image\n  }\n}": typeof types.FavoriteCharactersDocument,
};
const documents: Documents = {
    "query Character($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    species\n    gender\n    image\n    origin {\n      name\n    }\n    location {\n      name\n    }\n    episode {\n      id\n    }\n  }\n}": types.CharacterDocument,
    "query Characters($page: Int, $filter: FilterCharacter) {\n  characters(page: $page, filter: $filter) {\n    info {\n      pages\n    }\n    results {\n      id\n      name\n      status\n      species\n      image\n    }\n  }\n}": types.CharactersDocument,
    "query FavoriteCharacters($ids: [ID!]!) {\n  charactersByIds(ids: $ids) {\n    id\n    name\n    status\n    species\n    image\n  }\n}": types.FavoriteCharactersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Character($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    species\n    gender\n    image\n    origin {\n      name\n    }\n    location {\n      name\n    }\n    episode {\n      id\n    }\n  }\n}"): (typeof documents)["query Character($id: ID!) {\n  character(id: $id) {\n    id\n    name\n    status\n    species\n    gender\n    image\n    origin {\n      name\n    }\n    location {\n      name\n    }\n    episode {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Characters($page: Int, $filter: FilterCharacter) {\n  characters(page: $page, filter: $filter) {\n    info {\n      pages\n    }\n    results {\n      id\n      name\n      status\n      species\n      image\n    }\n  }\n}"): (typeof documents)["query Characters($page: Int, $filter: FilterCharacter) {\n  characters(page: $page, filter: $filter) {\n    info {\n      pages\n    }\n    results {\n      id\n      name\n      status\n      species\n      image\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FavoriteCharacters($ids: [ID!]!) {\n  charactersByIds(ids: $ids) {\n    id\n    name\n    status\n    species\n    image\n  }\n}"): (typeof documents)["query FavoriteCharacters($ids: [ID!]!) {\n  charactersByIds(ids: $ids) {\n    id\n    name\n    status\n    species\n    image\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;