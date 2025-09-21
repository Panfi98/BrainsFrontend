import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { GetCvById } from "../../Fetcher/GetFetcher/GetCv.js";
import html2pdf from "html2pdf.js";
import "./CvPage.css";

const CvPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cvData, setCvData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const contentRef = useRef();

  useEffect(() => {
    setCvData(null);
    setError(null);
    setIsLoading(true);

    if (!id || !token) {
      setError("Missing required information to load CV.");
      setIsLoading(false);
      return;
    }

    async function fetchResume() {
      try {
        const response = await GetCvById(id, token);
        setCvData(response);
      } catch (err) {
        setError(err.message || "Failed to fetch CV data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResume();
  }, [id, token]);

  const handleDownload = async () => {
    try {
      const element = contentRef.current;
      const opt = {
        filename: "cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error downloading CV as PDF:", error);
    }
  };

  if (isLoading) return <div>Loading CV...</div>;
  if (error) return <div>Error loading CV: {error}</div>;
  if (!cvData) return <div>CV not found or unable to load data.</div>;

  // разделение skills
  const languages =
    cvData.infoSkills?.filter((s) => s.type?.toLowerCase() === "language") || [];
  const otherSkills =
    cvData.infoSkills?.filter((s) => s.type?.toLowerCase() !== "language") || [];

  // исключаем, чтобы отрендерить отдельно
  const ignoredKeys = ["resume", "infoSkills", "educations", "references"];
  const ignoredFields = ["id", "_id", "uuid", "status"];

  // форматирование дат → "MM.YYYY"
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  // рендер квадратиков для скилов
  const renderSkillLevel = (level) => {
    const max = 5;
    const filled = "■".repeat(level);
    const empty = "□".repeat(max - level);
    return filled + empty;
  };

  return (
    <div className="cv-page">
      <div className="cv-a4" ref={contentRef}>
        {/* Sidebar */}
        <aside className="cv-sidebar">
            {cvData.resume?.pictureURL && (
                <img
                src={cvData.resume.pictureURL}
                alt="Profile"
                className="cv-avatar"
                />
            )}
            <h2 className="cv-name">
                {cvData.resume?.firstName} {cvData.resume?.lastName}
            </h2>
            <p className="cv-contact">{cvData.resume?.email}</p>
            <p className="cv-contact">{cvData.resume?.phoneNumber}</p>

            {/* Languages всегда идут первыми */}
            {languages.length > 0 && (
                <div className="cv-block">
                <h3 className="cv-subtitle">Languages</h3>
                {languages.map((lang, i) => (
                    <p key={i} className="cv-lang">
                    {lang.name} – {renderSkillLevel(lang.level)}
                    </p>
                ))}
                </div>
            )}

            {/* Skills всегда идут после Languages */}
            {otherSkills.length > 0 && (
                <div className="cv-block">
                <h3 className="cv-subtitle">Skills</h3>
                {otherSkills.map((skill, i) => (
                    <p key={i} className="cv-skill">
                    {skill.name} – {renderSkillLevel(skill.level)}
                    </p>
                ))}
                </div>
            )}
            </aside>


        {/* Main */}
        <main className="cv-main">
          {cvData.resume?.summary && (
            <section className="cv-section">
              <h1 className="cv-title">About Me</h1>
              <p>{cvData.resume.summary}</p>
            </section>
          )}

          {/* Education (специальный рендер) */}
          {cvData.educations?.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">Education</h2>
              {cvData.educations.map((edu, i) => (
                <div key={i} className="cv-item">
                  <div className="cv-item-left">
                    <p className="cv-item-title">{edu.name}</p>
                    <p className="cv-field">{edu.degree}</p>
                    {edu.description && <p className="cv-field">{edu.description}</p>}
                  </div>
                  <span className="cv-item-dates">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </section>
          )}

          {/* Универсальные секции */}
          {Object.keys(cvData)
            .filter((key) => !ignoredKeys.includes(key))
            .map((key) => {
              const section = cvData[key];
              if (!section || section.length === 0) return null;

              const title = key.charAt(0).toUpperCase() + key.slice(1);

              return (
                <section key={key} className="cv-section">
                  <h2 className="cv-section-title">{title}</h2>
                  {Array.isArray(section) ? (
                    section.map((item, i) => {
                      const entries = Object.entries(item).filter(
                        ([field]) => !ignoredFields.includes(field)
                      );

                      const start = item.startDate || item.startAt;
                      const end = item.endDate || item.endedAt;
                      const date = item.date;
                      const validTo = item.validTo

                      const [firstField, firstValue] = entries[0] || [];

                      return (
                        <div key={i} className="cv-item">
                          <div className="cv-item-left">
                            {firstValue && (
                              <p className="cv-item-title">{firstValue}</p>
                            )}
                            {entries.slice(1).map(([field, value]) => {
                              if (!value) return null;

                              if (
                                field.toLowerCase().includes("url") ||
                                field.toLowerCase().includes("link")
                              ) {
                                return (
                                  <p key={field} className="cv-field">
                                    <a
                                      href={value}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="cv-link"
                                    >
                                      {value}
                                    </a>
                                  </p>
                                );
                              }

                              if (
                                ["startDate", "endDate", "startAt", "endedAt", "date", "validTo"].includes(field)
                              ) {
                                return null;
                              }

                              return (
                                <p key={field} className="cv-field">
                                  {value}
                                </p>
                              );
                            })}
                          </div>

                          {/* Даты (для education, experience и сертификатов) */}
                        {(start || end || item.date || item.validTo) && (
                        <span className="cv-item-dates">
                            {start || end
                            ? `${formatDate(start)} – ${formatDate(end)}`
                            : formatDate(item.date || item.validTo)}
                        </span>
                        )}
                        </div>
                      );
                    })
                  ) : (
                    <p>{JSON.stringify(section)}</p>
                  )}
                </section>
              );
            })}

          {/* References (всегда в конце) */}
          {cvData.references?.length > 0 && (
            <section className="cv-section">
              <h2 className="cv-section-title">References</h2>
              {cvData.references.map((ref, i) => {
                const fullName = [ref.firstName, ref.lastName, ref.name]
                  .filter(Boolean)
                  .join(" ");
                const extraInfo = [
                  ref.position,
                  ref.email,
                  ref.phoneNumber,
                ]
                  .filter(Boolean)
                  .join(" • ");
                const date = ref.date || ref.addedAt;

                return (
                  <div key={i} className="cv-reference">
                    <div className="cv-ref-left">
                      <span className="cv-ref-name">{fullName}</span>
                      {extraInfo && <span className="cv-ref-extra"> {extraInfo}</span>}
                    </div>
                    {date && (
                      <span className="cv-ref-date">{formatDate(date)}</span>
                    )}
                  </div>
                );
              })}
            </section>
          )}
        </main>
      </div>

      <div className="cv-buttons">
        <button className="btn">Edit</button>
        <button className="btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default CvPage;
