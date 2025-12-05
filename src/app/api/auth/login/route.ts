import { NextRequest, NextResponse } from 'next/server';

// 寫死的有效帳密
const VALID_CREDENTIALS = {
    username: 'admin',
    password: 'password123',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // 驗證帳密
        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            return NextResponse.json(
                { success: true, message: '登入成功' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: '帳號或密碼錯誤' },
                { status: 401 }
            );
        }
    } catch {
        return NextResponse.json(
            { success: false, message: '請求格式錯誤' },
            { status: 400 }
        );
    }
}
