"use client";

import { Dialog } from "@/app/dashboard/dialogue/dialog.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFromNow } from "@/lib/dateFormat";
import { BarChart, Calendar, Globe, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BadgeAccess } from "./feature/badge-acces/BadgeAccess";

export function DialogueThumbnailCard({
  access,
  createdAt,
  language,
  title,
  level,
  id,
  user,
  imageCover,
  isPublic,
}: Dialog & { isPublic?: boolean }) {
  const url = isPublic
    ? `/explore/dialogue/${id}`
    : `/dashboard/dialogue/${id}`;
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={imageCover}
          alt={title}
          objectFit="cover"
          fill
          sizes="100%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
          Dialogue
        </Badge>
        <BadgeAccess access={access} />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDateFromNow(createdAt)}
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {user.name}
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            {language}
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-1" />
            {level}
          </div>
        </div>
        <Link href={url} passHref>
          <Button variant="outline" className="w-full">
            Let us View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
