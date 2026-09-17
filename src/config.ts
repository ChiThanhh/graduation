export const appConfig = {
  googleSheetEndpoint:
    (import.meta.env.VITE_GOOGLE_SHEET_WEB_APP_URL as string | undefined) ?? "",
}
