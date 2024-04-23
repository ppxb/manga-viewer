import { ContentTypeEnum, RequestEnum } from '~/enums/http'
import request, { BASE_URL } from '~/utils/request'

export function fetchQRCode() {
  return request<API.QRCodeRes>({
    url: `${BASE_URL}/oauth/authorize/qrcode`,
    method: RequestEnum.GET,
  })
}

export function fetchAccessToken(data: API.AccessTokenReq) {
  return request<API.AccessTokenRes>({
    url: `${BASE_URL}/oauth/access_token`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    data,
  })
}

export function fetchQRCodeStatus(data: API.QRCodeStatusReq) {
  return request<API.QRCodeStatusRes>({
    url: `${BASE_URL}/oauth/qrcode/${data.sid}/status`,
    method: RequestEnum.GET,
  })
}
