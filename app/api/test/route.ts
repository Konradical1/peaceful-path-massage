import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET() {
  try {
    // Try to set a test value
    await redis.set('test:connection', 'Hello from Redis!')
    
    // Try to get the test value
    const testValue = await redis.get('test:connection')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Redis connection successful',
      testValue 
    })
  } catch (error) {
    console.error('Redis connection error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to Redis', details: error },
      { status: 500 }
    )
  }
} 