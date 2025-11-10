"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Award, Languages, X } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"

interface Program {
  id: number;
  category: string;
  icon: any;
  title: string;
  description: string;
  duration: string;
  method: string;
  languages: string[];
  certification: boolean;
  topics: string[];
}

interface ProgramInfoModalProps {
  program: Program | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (programId: number) => void;
  registering: boolean;
}

export default function ProgramInfoModal({
  program,
  isOpen,
  onClose,
  onRegister,
  registering
}: ProgramInfoModalProps) {
  const t = useTranslation();

  if (!program) return null;

  const Icon = program.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="h-8 w-8 text-amber-500" />
              <DialogTitle className="text-2xl">{program.title}</DialogTitle>
            </div>
            {program.certification && (
              <Badge className="bg-amber-100 text-amber-800">
                {t("academy_certified")}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("academy_modal_description")}
            </h3>
            <p className="text-gray-600">{program.description}</p>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{t("academy_modal_duration")}</p>
                <p className="text-sm text-gray-600">{program.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{t("academy_modal_method")}</p>
                <p className="text-sm text-gray-600">{program.method}</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Languages className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">{t("academy_modal_languages")}</h3>
            </div>
            <div className="flex space-x-2">
              {program.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-sm">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Topics/Curriculum */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t("academy_modal_curriculum")}
            </h3>
            <ul className="space-y-2">
              {program.topics.map((topic, index) => (
                <li key={index} className="flex items-start text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certification Info */}
          {program.certification && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-amber-600" />
                <h3 className="font-medium text-amber-800">{t("academy_modal_certification")}</h3>
              </div>
              <p className="text-sm text-amber-700">
                {t("academy_modal_certification_desc")}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              onClick={() => onRegister(program.id)}
              disabled={registering}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
            >
              {registering ? t("academy_btn_registering") : t("academy_btn_register")}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {t("academy_modal_close")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
