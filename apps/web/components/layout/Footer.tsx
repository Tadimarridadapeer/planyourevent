import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-serif font-bold text-lg">
                P
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                PlanMyEvent
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Anantapur&apos;s local event-planning marketplace. Discover, compare, shortlist, and book verified venues, caterers, decorators, and photographers in Rayalaseema.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-500 font-medium pt-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Anantapur, Andhra Pradesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Planning Tools</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/my-event" className="hover:text-white transition-colors">
                  Event Builder
                </Link>
              </li>
              <li>
                <Link href="/my-event" className="hover:text-white transition-colors">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-white transition-colors">
                  Vendor Marketplace
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-white transition-colors">
                  Inspiration Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Top Categories in Anantapur</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/vendors?category=venues" className="hover:text-white transition-colors">
                  AC Convention Halls & Venues
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=photographers" className="hover:text-white transition-colors">
                  Candid Wedding Photographers
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=decorators" className="hover:text-white transition-colors">
                  Telugu Mandap Decorators
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=caterers" className="hover:text-white transition-colors">
                  Rayalaseema Traditional Caterers
                </Link>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Verified Managed Platform</h4>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="text-xs font-bold text-rose-500">
                100% Manually Verified
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Every vendor in Anantapur is personally onboarded and verified by our internal curation team.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 PlanMyEvent Technologies India. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-zinc-300">
              Admin Portal
            </Link>
            <span>&bull;</span>
            <span className="text-zinc-400">Anantapur, Andhra Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
