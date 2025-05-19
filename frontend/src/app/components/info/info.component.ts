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

  public getAuthorNames(): string {
    return this.paper.authors && this.paper.authors.length
      ? this.paper.authors.map(a => a.name).join(', ')
      : 'N/A';
  }

  public getThumbnailUrl(): string {
    const thumb = this.paper.links.find(l => l.type.startsWith('thumbnail'));
    return thumb?.url ?? 'assets/default-thumbnail.png';
  }

  public getDownloadLink(): Link | undefined {
    return this.paper.links.find(l => l.type === 'download');
  }

  public getOtherLinks(): Link[] {
    return this.paper.links.filter(l =>
      l.type !== 'download' && !l.type.startsWith('thumbnail')
    );
  }

  public openLink(url: string) {
    window.open(url, '_blank');
  }

  public goBack() {
    this.location.back();
  }
}
