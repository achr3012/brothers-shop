"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <ul>
      <li><Link href={`/category/one`}>One</Link></li>
      <li><Link href={`/category/one`}>Link 1</Link></li>
      <li><Link href={`/category/one`}>Two</Link></li>
      <li><Link href={`/category/one`}>Link 2</Link></li>
      <li><Link href={`/category/one`}>Three</Link></li>
      <li><Link href={`/category/one`}>Link 3</Link></li>
      <li><Link href={`/category/one`}>Four</Link></li>
      <li><Link href={`/category/one`}>Link 4</Link></li>
      <li><Link href={`/category/one`}>One</Link></li>
      <li><Link href={`/category/one`}>Link 1</Link></li>
      <li><Link href={`/category/one`}>Two</Link></li>
      <li><Link href={`/category/one`}>Link 2</Link></li>
      <li><Link href={`/category/one`}>Three</Link></li>
      <li><Link href={`/category/one`}>Link 3</Link></li>
      <li><Link href={`/category/one`}>Four</Link></li>
      <li><Link href={`/category/one`}>Link 4</Link></li>
      {/* <li>One</li>
      <li>Link 1</li>
      <li>Two</li>
      <li>Link 2</li>
      <li>Three</li>
      <li>Link 3</li>
      <li>Four</li>
      <li>Link 4</li> */}
    </ul>
  )
}