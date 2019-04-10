/**
 *  Youdao Translate, My private account is for testing purposes only.
 *  Please go to the official account to apply for an account. Thank you for your cooperation.
 *  APP ID：055c2d71f9a05214
 *  Secret key：ZcpuQxQW3NkQeKVkqrXIKQYXH57g2KuN
 */
declare const md5: any
declare const qs: any
declare const fs: any
declare const path: any
declare const axios: any
declare const jsonFormat: any
declare const languages: {
    key: string;
    title: string;
    flag: string;
}[]
declare const defaultLanguage = 'cn'
declare const locales: {}
declare const youdao: ({ q, from, to }: {
    q: any;
    from: any;
    to: any;
}) => Promise<{}>
declare const transform: ({ from, to, locales, outputPath }: {
    from: any;
    to: any;
    locales: any;
    outputPath: any;
}) => Promise<void>
