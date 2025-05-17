// src/app/components/info/info.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Result } from 'src/app/models/result.model';
import { Link } from 'src/app/models/link.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public paper!: Result;
  public location: Location;

  constructor(
    private route: ActivatedRoute,
    loc: Location
  ) {
    this.location = loc;
  }

  ngOnInit() {
    const nav = this.location.getState() as { paper: Result };
    this.paper = nav.paper;
  }

  /** Authors as comma-list */
  public getAuthorNames(): string {
    if (!this.paper.authors || this.paper.authors.length === 0) {
      return 'N/A';
    }
    return this.paper.authors.map(a => a.name).join(', ');
  }

  /** Thumbnail URL or default */
  public getThumbnailUrl(): string {
    const thumb = this.paper.links.find(l => l.type.startsWith('thumbnail'));
    return thumb?.url ?? 'assets/default-thumbnail.png';
  }

  /** The “download” link, if any */
  public getDownloadLink(): Link | undefined {
    return this.paper.links.find(l => l.type === 'download');
  }

  /** All other links (reader, display, etc.) */
  public getOtherLinks(): Link[] {
    return this.paper.links.filter(l =>
      l.type !== 'download' && !l.type.startsWith('thumbnail')
    );
  }

  /** Open an external URL */
  public openLink(url: string) {
    window.open(url, '_blank');
  }

  /** Back navigation */
  public goBack() {
    this.location.back();
  }
}
