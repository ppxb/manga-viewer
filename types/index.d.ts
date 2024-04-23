declare namespace API {
  interface QRCodeRes {
    qrCodeUrl: string
    sid: string
  }

  interface AccessTokenReq {
    grant_type: string
    code?: string
    refresh_token?: string
  }

  interface AccessTokenRes {
    token_type: string
    access_token: string
    refresh_token: string
    expires_in: number
  }

  interface QRCodeStatusReq {
    sid: string
  }

  interface QRCodeStatusRes {
    authCode: string
    status: string
  }
}
